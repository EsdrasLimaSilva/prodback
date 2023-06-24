import FeedbackCard from "@/app/components/FeedbackCard";
import styles from "@/styles/home.module.scss";
import { Feedback } from "./api/route";

export default async function Home() {
    const response = await fetch("http://localhost:3000/api", {
        next: { revalidate: 60 },
    });
    const feedbacks: Feedback[] = await response.json();

    return (
        <main className={styles.mainContainer}>
            <header className={styles.header}>
                <div>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback product</h2>
                </div>
            </header>

            <section className={styles.feedSection}>
                <header className={styles.feedbacksHeader}>
                    <h2>6 suggestions</h2>
                </header>
                <main>
                    {feedbacks.map((fbck) => {
                        const feed = { ...fbck, _id: String(fbck._id) };

                        return <FeedbackCard feedback={feed} />;
                    })}
                </main>
            </section>
        </main>
    );
}
