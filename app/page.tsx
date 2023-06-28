import styles from "@/styles/home.module.scss";
import MenuTags from "./components/MenuTags";
import FeedbackList from "./components/FeedbackList";

import FeedListHeader from "./components/FeedListHeader";
import { Feedback } from "@/types";
import { headers } from "next/dist/client/components/headers";

/*
Home page
*/
export default async function Home() {
    //get the 10 most recent feedbacks
    const headersList = headers();
    const domain = headersList.get("host");

    const response = await fetch(`http://${domain}/api/feedbacks`, {
        next: {
            tags: ["feedbacks"],
        },
    });
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
                <FeedListHeader numOfFeedbacks={feedbacks.length} />
                <main>
                    <FeedbackList feedbacks={feedbacks} />
                </main>
            </section>
        </main>
    );
}
