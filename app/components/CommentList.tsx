"use client";

import { Feedback } from "@/types";
import CommentCard from "./CommentCard";

//style
import styles from "@/styles/innerpage.module.scss";
import { useState } from "react";
import AddReplyModal from "./AddReplyModal";

/*
Contains all comments and control "AddReplyModal" visibility
*/
export default function CommentList({ feedback }: { feedback: Feedback }) {
    const [modalVisible, setModalVisible] = useState(true);

    const showModal = () => {};

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible && <AddReplyModal hideModal={hideModal} />}
            <section className={styles.commentsSection}>
                {feedback.comments.length > 0 ? (
                    feedback.comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                ) : (
                    <p>No comments!</p>
                )}
            </section>
        </>
    );
}
