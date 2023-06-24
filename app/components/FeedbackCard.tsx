import { Comment } from "@/app/api/route";
import styles from "@/styles/home.module.scss";
import { memo } from "react";

interface Props {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
}

const FeedbackCard = ({ feedback }: { feedback: Props }) => {
    return (
        <div
            data-testid="feedcard"
            id={String(feedback._id)}
            className={styles.feedbackCard}
        >
            <h2>{feedback.title}</h2>
            <p>{feedback.description}</p>
        </div>
    );
};

export default memo(FeedbackCard);
