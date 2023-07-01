"use client";
import styles from "@/styles/innerpage.module.scss";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { selectAdmin } from "../redux/slices/adminSlice";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { Comment } from "@/types";

/*
This is the componet rendered on the inner page and is used to allow user to write comments. It receives a list of comments of an specific feedback to be able to sent a request to update the comments
*/
export default function AddCommentCard({ comments }: { comments: Comment[] }) {
    const [comment, setComment] = useState("");
    const [characters, setCharacters] = useState(250);
    const [postingComment, setPostingComment] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
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
            setComment(textarea.value);
        }
    };

    /**
     * Push the comment on the feedback
     */
    const pushComment = async () => {
        try {
            //set to true to show the spinner
            setPostingComment(true);

            //creating the new comment
            const newComment: Comment = {
                id: uuid(),
                content: comment,
                imageurl: admin.imageurl,
                replies: [],
                user: { name: admin.user.name, lastname: admin.user.lastname },
                username: admin.username,
            };

            //pushing the new comment to the old comments
            const newComments = [...comments, newComment];

            //making the request to put the comments
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

            //reset the comment value (on the input too)
            setComment("");

            //refresh the page to get the recent comment
            router.refresh();
        } catch (err) {
            console.log(err);
        } finally {
            setPostingComment(false);
        }
    };

    return (
        <section
            data-testid="addcommentcard"
            className={styles.addCommentSection}
        >
            <h3>Add Comment</h3>
            <textarea
                cols={30}
                rows={10}
                placeholder="Type your comment"
                value={comment}
                onChange={handleChange}
                data-testid="textareacomment"
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
