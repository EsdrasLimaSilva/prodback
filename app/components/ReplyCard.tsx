"use client";

import Image from "next/image";

import styles from "@/styles/innerpage.module.scss";
import { Reply } from "@/types";

/*
it's similiar to "CommentCard" component with some different features. It could be fused into one component with the "CommentCard" but i think is cleaner if it's separeted.
*/
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
                <header>
                    <span>
                        <h2>
                            {reply.user.name} {reply.user.lastname}
                        </h2>
                        <h3>{reply.username}</h3>
                    </span>

                    <button type="button">Reply</button>
                </header>
                <p>
                    <strong>{reply.replyto}</strong> {reply.content}
                </p>
            </span>
        </div>
    );
}
