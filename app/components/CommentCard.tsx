"use client";

import Image from "next/image";

import styles from "@/styles/innerpage.module.scss";
import ReplyCard from "./ReplyCard";
import { Comment } from "@/types";

//This is the comment card, is shown only in the inner page
export default function CommentCard({
    comment,
    showModal,
}: {
    comment: Comment;
    showModal: (commentId: string) => void;
}) {
    return (
        <div className={styles.commentCard}>
            <span>
                <Image
                    width={50}
                    height={50}
                    src={comment.imageurl}
                    alt="profile image"
                />
            </span>
            <span className={styles.commentContent}>
                <header>
                    <span>
                        <h2>
                            {comment.user.name} {comment.user.lastname}
                        </h2>
                        <h3>{comment.username}</h3>
                    </span>

                    <button type="button" onClick={() => showModal(comment.id)}>
                        Reply
                    </button>
                </header>

                <p>{comment.content}</p>

                <div>
                    {comment.replies.map((reply) => (
                        <ReplyCard
                            key={reply.id}
                            reply={reply}
                            showModal={showModal}
                            commentId={comment.id}
                        />
                    ))}
                </div>
            </span>
        </div>
    );
}
