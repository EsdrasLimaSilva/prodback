"use client";
import styles from "@/styles/innerpage.module.scss";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Comment } from "../page";
import { useSelector } from "react-redux";
import { selectAdmin } from "../redux/slices/adminSlice";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function AddCommentCard({ comments }: { comments: Comment[] }) {
    const [comment, setComment] = useState("");
    const [characters, setCharacters] = useState(250);
    const [postingComment, setPostingComment] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const admin = useSelector(selectAdmin);

    const handleChange = (e: ChangeEvent) => {
        const textarea = e.target as HTMLTextAreaElement;
        const numOfChars = 250 - textarea.value.length;

        if (numOfChars > -1) {
            setCharacters(numOfChars);
            setComment(textarea.value);
        }
    };

    const pushComment = async () => {
        try {
            setPostingComment(true);
            const newComment: Comment = {
                id: uuid(),
                content: comment,
                imageurl: admin.imageurl,
                replies: [],
                user: { name: admin.user.name, lastname: admin.user.lastname },
                username: admin.username,
            };
            const newComments = [...comments, newComment];

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

            setComment("");
            router.refresh();
        } catch (err) {
            console.log(err);
        } finally {
            setPostingComment(false);
        }
    };

    return (
        <section className={styles.addCommentSection}>
            <h3>Add Comment</h3>
            <textarea
                cols={30}
                rows={10}
                placeholder="Type your comment"
                value={comment}
                onChange={handleChange}
            ></textarea>

            <span>
                <p>{characters} Characters left</p>
                <button
                    type="button"
                    onClick={pushComment}
                    disabled={comment.length <= 0}
                >
                    {postingComment ? <ImSpinner8 /> : "Post Comment"}
                </button>
            </span>
        </section>
    );
}
