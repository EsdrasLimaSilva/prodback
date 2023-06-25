"use client";
import styles from "@/styles/innerpage.module.scss";
import { useState } from "react";

export default function AddCommentCard() {
    const [characters, setCharacters] = useState(250);
    return (
        <section className={styles.addCommentSection}>
            <h3>Add Comment</h3>
            <textarea
                cols={30}
                rows={10}
                placeholder="Type your comment"
            ></textarea>

            <span>
                <p>{characters} Characters left</p>
                <button type="button">Post Comment</button>
            </span>
        </section>
    );
}
