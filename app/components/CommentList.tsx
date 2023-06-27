"use client";

import { Feedback } from "@/types";
import CommentCard from "./CommentCard";

//style
import styles from "@/styles/innerpage.module.scss";
import { useEffect, useState } from "react";
import AddReplyModal from "./AddReplyModal";
import { useDispatch } from "react-redux";
import { setTargetComment } from "../redux/slices/replySlice";
import { setFeedback } from "../redux/slices/feedbackSlice";

/*
Contains all comments and control "AddReplyModal" visibility
*/
export default function CommentList({ feedback }: { feedback: Feedback }) {
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    /*
    Controls the visibility of the AddReplyModal and dispatch the target id of the comment
    for the redux control
    */
    const showModal = (commentId: string, replyId?: string) => {
        dispatch(
            setTargetComment({
                targetComment: commentId,
                rep: { target: !!replyId, id: replyId || "" },
            })
        );
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        dispatch(setFeedback(feedback));
    }, []);

    return (
        <>
            {modalVisible && <AddReplyModal hideModal={hideModal} />}
            <section className={styles.commentsSection}>
                {feedback.comments.length > 0 ? (
                    feedback.comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            showModal={showModal}
                        />
                    ))
                ) : (
                    <p>No comments!</p>
                )}
            </section>
        </>
    );
}
