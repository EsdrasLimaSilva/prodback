//components
import Link from "next/link";
import CommentCard from "../components/CommentCard";
import FeedbackCard from "../components/FeedbackCard";
import AddCommentCard from "../components/AddCommentCard";

//icon
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

//style
import styles from "@/styles/innerpage.module.scss";

//types
import { Feedbck } from "@/types";

/*
This is the inner page, where user can find the comments and write and replay in a specific feedback. IT receives on param passed in the url (the feedback id). The id is used to fetch the data from mongodb
*/
export default async function InnerPage({
    params,
}: {
    params: { feedbackId: string };
}) {
    //fetching the feedback data
    const response = await fetch(
        `http://localhost:3000/api/feedbacks?feedbackId=${params.feedbackId}`,
        {
            cache: "no-store",
        }
    );
    const feedback: Feedbck[] = await response.json();

    //rendreing the page
    return (
        <>
            <header className={styles.header}>
                <Link href="/">
                    <MdOutlineKeyboardArrowLeft />
                    Go back
                </Link>

                <button type="button">Edit Feedback</button>
            </header>
            <main className={styles.mainContainer}>
                <FeedbackCard feedback={feedback[0]} />

                <section className={styles.commentsSection}>
                    {feedback[0].comments.length > 0 ? (
                        feedback[0].comments.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p>No comments!</p>
                    )}
                </section>

                <AddCommentCard comments={feedback[0].comments} />
            </main>
        </>
    );
}
