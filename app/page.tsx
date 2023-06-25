import styles from "@/styles/home.module.scss";
import MenuTags from "./components/MenuTags";
import { ObjectId } from "mongodb";
import FeedbackList from "./components/FeedbackList";
import { Reply } from "./redux/slices/feedbackSlice";

import { HiLightBulb } from "react-icons/hi";
import SelectOrder from "./components/SelectOrder";
import FeedListHeader from "./components/FeedListHeader";

export interface Comment {
    id: string;
    content: string;
    user: {
        name: string;
        lastname: string;
    };
    username: string;
    imageurl: string;
    replies: Reply[];
}

export interface Feedback {
    _id: ObjectId;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
    date: string;
}

export default async function Home() {
    const response = await fetch("http://localhost:3000/api/feedbacks", {
        cache: "no-store",
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
