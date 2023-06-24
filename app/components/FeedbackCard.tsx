import { Comment } from "@/app/api/route";
import styles from "@/styles/home.module.scss";
import { memo } from "react";
import { FaComment } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

interface Props {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
}

const FeedbackCard = ({ feedback }: { feedback: Props }) => {
    let comments = feedback.comments.length;
    feedback.comments.forEach(
        (comment) => (comments += comment.replies.length)
    );

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
                <h2>{feedback.title}</h2>
                <p>{feedback.description}</p>
                <span>
                    {feedback.tags.map((tag) => (
                        <span className={styles.tag}>{tag}</span>
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
