import styles from "@/styles/home.module.scss";
import { Feedback } from "@/app/page";
import { memo } from "react";

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className={styles.feedbackCard}>
            <h2>{feedback.title}</h2>
            <p>{feedback.description}</p>
        </div>
    );
};

export default memo(FeedbackCard);
