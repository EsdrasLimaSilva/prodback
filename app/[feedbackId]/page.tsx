import CommentCard from "../components/CommentCard";
import FeedbackCard from "../components/FeedbackCard";
import { Feedbck } from "../redux/slices/feedbackSlice";

import styles from "@/styles/innerpage.module.scss";

export default async function InnerPage({
    params,
}: {
    params: { feedbackId: string };
}) {
    const response = await fetch(
        `http://localhost:3000/api/feedbacks?feedbackId=${params.feedbackId}`,
        { next: { revalidate: 60 } }
    );
    const feedback: Feedbck[] = await response.json();

    return (
        <>
            <header></header>
            <main className={styles.mainContainer}>
                <FeedbackCard feedback={feedback[0]} />

                <section className={styles.commentsSection}>
                    {feedback[0].comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </section>
            </main>
        </>
    );
}
