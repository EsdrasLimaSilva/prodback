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
                <header>
                    <span>
                        <h2>
                            {comment.user.name} {comment.user.lastname}
                        </h2>
                        <h3>{comment.username}</h3>
                    </span>

                    <button type="button">Reply</button>
                </header>

                <p>{comment.content}</p>

                <div>
                    {comment.replies.map((reply) => (
                        <ReplyCard key={reply.id} reply={reply} />
                    ))}
                </div>
            </span>
        </div>
    );
}
