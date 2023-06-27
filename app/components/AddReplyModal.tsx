"use client";

import styles from "@/styles/innerpage.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectFeddback } from "../redux/slices/feedbackSlice";
import { selectReply } from "../redux/slices/replySlice";
import { Comment, Feedbck, Reply } from "@/types";
import { v4 as uuid } from "uuid";
import { selectAdmin } from "../redux/slices/adminSlice";
import { usePathname, useRouter } from "next/navigation";

export default function AddReplyModal({
    hideModal,
}: {
    hideModal: () => void;
}) {
    const [reply, setReply] = useState("");
    const [characters, setCharacters] = useState(250);
    const [postingReply, setPostingReply] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    //selecting the comments of the current feedback, the reply info and admin info
    const feedback = useSelector(selectFeddback);
    const replyInfo = useSelector(selectReply);
    const admin = useSelector(selectAdmin);

    /**
     * Controls the comment typing, limtating the num of characters remain
     * @param e React Change Event
     */
    const handleChange = (e: ChangeEvent) => {
        const textarea = e.target as HTMLTextAreaElement;
        const numOfChars = 250 - textarea.value.length;

        if (numOfChars > -1) {
            setCharacters(numOfChars);
            setReply(textarea.value);
        }
    };

    //creates the reply and isert into the feedback
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newReply: Reply = {
            id: uuid(),
            content: reply,
            imageurl: admin.imageurl,
            replyto: feedback.comments.find(
                (comment) => comment.id === replyInfo.targetComment
            )!.username,
            user: {
                name: admin.user.name,
                lastname: admin.user.lastname,
            },
            username: admin.username,
        };

        try {
            const feedbackCopy = { ...feedback };

            const newComments = [...feedbackCopy.comments];

            const targetComment = newComments.find(
                (comment) => comment.id === replyInfo.targetComment
            )!;
            const targetIndex = newComments.findIndex(
                (comment) => comment.id === replyInfo.targetComment
            )!;

            const targetCopy = {
                ...targetComment,
                replies: [...targetComment.replies],
            };

            if (replyInfo.rep.target) {
                //it means that the user is replying a reply
                newReply.replyto = targetCopy.replies.find(
                    (reply) => reply.id === replyInfo.rep.id
                )!.username;
            }

            targetCopy.replies.push(newReply);
            newComments[targetIndex] = targetCopy;

            await fetch(
                `http://localhost:3000/api/feedbacks?feedbackId=${pathname.replace(
                    "/",
                    ""
                )}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newComments),
                }
            );

            hideModal();
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    if (postingReply) {
        return (
            <div className={styles.addReplyModal}>
                <div>
                    <ImSpinner8 />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.addReplyModal}>
            <form onSubmit={handleSubmit}>
                <label>
                    <h3>Reply - {characters} characters left</h3>
                    <textarea
                        required
                        onChange={handleChange}
                        value={reply}
                        placeholder="type your reply"
                    />
                </label>

                <span>
                    <button type="button" onClick={hideModal}>
                        Cancel
                    </button>
                    <button type="submit">Reply</button>
                </span>
            </form>
        </div>
    );
}
