"use client";

import { useSelector } from "react-redux";
import { selectFeddback } from "../redux/slices/feedbackSlice";
import FeedbackCard from "../components/FeedbackCard";

import styles from "@/styles/innerpage.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FeedPage({
    params,
}: {
    params: { feedbackId: string };
}) {
    const { feedback } = useSelector(selectFeddback);
    const router = useRouter();

    useEffect(() => {
        console.log(params.feedbackId);
    }, []);

    if (feedback.title) {
        return (
            <>
                <header></header>
                <main className={styles.mainContainer}>
                    <FeedbackCard feedback={feedback} />

                    <section className={styles.commentsSection}></section>
                </main>
            </>
        );
    }

    router.replace("/");
}
