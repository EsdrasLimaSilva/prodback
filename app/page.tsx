import styles from "@/styles/home.module.scss";

interface Comment {
    id: string;
    content: string;
    username: string;
    imageurl: string;
    replies: Comment[];
}

interface Feedback {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
}

export default async function Home() {
    const response = await fetch("http://localhost:5000", {
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
                    {feedbacks.map((fbck) => (
                        <div>
                            <h2>{fbck.title}</h2>
                            <p>{fbck.description}</p>
                        </div>
                    ))}
                </main>
            </section>
        </main>
    );
}
