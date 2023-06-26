"use client";

import styles from "@/styles/innerpage.module.scss";
import { ChangeEvent, useState } from "react";

export default function AddReplyModal({
    hideModal,
}: {
    hideModal: () => void;
}) {
    const [reply, setReply] = useState("");
    const [characters, setCharacters] = useState(250);
    const [postingReply, setPostingReply] = useState(false);

    /**
     * Controls the comment typing, limtating the num of characters remain
     * @param e React Change Event
     */
    const handleChange = (e: ChangeEvent) => {
        const textarea = e.target as HTMLTextAreaElement;
        const numOfChars = 250 - textarea.value.length;

        if (numOfChars > -1) {
            setCharacters(numOfChars);
            setReply(textarea.value);
        }
    };

    return (
        <div className={styles.addReplyModal}>
            <form>
                <label>
                    <h3>Reply - {characters} characters left</h3>
                    <textarea required onChange={handleChange} value={reply} />
                </label>

                <span>
                    <button type="button" onClick={hideModal}>
                        Cancel
                    </button>
                    <button type="submit">Reply</button>
                </span>
            </form>
        </div>
    );
}
