"use client";

import Image from "next/image";
import { Comment } from "../page";

import styles from "@/styles/innerpage.module.scss";
import ReplyCard from "./ReplyCard";

export default function CommentCard({ comment }: { comment: Comment }) {
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
                <h2>
                    {comment.user.name} {comment.user.lastname}
                </h2>
                <h3>{comment.username}</h3>
                <p>{comment.content}</p>

                <div>
                    {comment.replies.map((reply) => (
                        <ReplyCard reply={reply} />
                    ))}
                </div>
            </span>
        </div>
    );
}
