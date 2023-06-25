"use client";

import Image from "next/image";
import { Comment } from "../page";

import styles from "@/styles/innerpage.module.scss";
import { Reply } from "../redux/slices/feedbackSlice";

export default function ReplyCard({ reply }: { reply: Reply }) {
    return (
        <div className={styles.replyCard}>
            <span>
                <Image
                    width={50}
                    height={50}
                    src={reply.imageurl}
                    alt="profile image"
                />
            </span>
            <span className={styles.commentContent}>
                <h2>
                    {reply.user.name} {reply.user.lastname}
                </h2>
                <h3>{reply.username}</h3>
                <p>
                    <strong>{reply.replyto}</strong> {reply.content}
                </p>
            </span>
        </div>
    );
}