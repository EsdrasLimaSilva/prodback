"use client";

import styles from "@/styles/home.module.scss";
import { memo } from "react";
import { FaComment } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { Comment } from "../page";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFeedback } from "../redux/slices/feedbackSlice";

interface Props {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
}

const FeedbackCard = ({ feedback }: { feedback: Props }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    let comments = feedback.comments.length;
    feedback.comments.forEach(
        (comment) => (comments += comment.replies.length)
    );

    const setTargetFeedback = () => {
        dispatch(setFeedback(feedback));
        router.push(`/${feedback._id}`);
    };

    return (
        <div
            data-testid="feedcard"
            id={String(feedback._id)}
            className={styles.feedbackCard}
        >
            <span className={styles.upsContainer}>
                <IoIosArrowUp />
                <p>{feedback.ups}</p>
            </span>
            <span className={styles.contentContainer}>
                <h2 onClick={setTargetFeedback}>{feedback.title}</h2>
                <p>{feedback.description}</p>
                <span>
                    {feedback.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </span>
            </span>
            <span className={styles.commentsCountContainer}>
                <FaComment />
                {comments}
            </span>
        </div>
    );
};

export default memo(FeedbackCard);
