"use client";

import styles from "@/styles/home.module.scss";
import { memo } from "react";
import { FaComment } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Feedbck } from "@/types";

//This is where the feedback info is shown
const FeedbackCard = ({ feedback }: { feedback: Feedbck }) => {
    const router = useRouter();

    let comments = feedback.comments.length;
    feedback.comments.forEach(
        (comment) => (comments += comment.replies.length)
    );

    //go to the feedback route (dynamic)
    const goToFeedback = () => {
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
                <h2 onClick={goToFeedback}>{feedback.title}</h2>
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
