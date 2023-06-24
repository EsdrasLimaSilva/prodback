import FeedbackCard from "@/app/components/FeedbackCard";
import styles from "@/styles/home.module.scss";
import { Feedback } from "./api/route";
import MenuTags from "./components/MenuTags";

export default async function Home() {
    const response = await fetch("http://localhost:3000/api");
    const feedbacks: Feedback[] = await response.json();

    return (
        <main className={styles.mainContainer}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback product</h2>
                </div>

                <MenuTags />
            </header>

            <section className={styles.feedSection}>
                <header className={styles.feedbacksHeader}>
                    <h2>{feedbacks.length} suggestions</h2>
                </header>
                <main>
                    {feedbacks.map((fbck) => {
                        const feed = { ...fbck, _id: String(fbck._id) };

                        return (
                            <FeedbackCard
                                key={String(fbck._id)}
                                feedback={feed}
                            />
                        );
                    })}
                </main>
            </section>
        </main>
    );
}
