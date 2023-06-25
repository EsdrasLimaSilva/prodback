"use client";

import styles from "@/styles/home.module.scss";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function AddFeedbackModal() {
    const [checkedBox, setCheckedBox] = useState(0);
    const [tagWarning, setTagWarning] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!checkedBox) {
            setTagWarning(true);
            setTimeout(() => {
                setTagWarning(false);
            }, 4000);
        } else {
            const form = e.target as HTMLFormElement;
            console.log(form[0]);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent) => {
        const box = e.target as HTMLInputElement;

        if (box.checked) setCheckedBox((prev) => prev + 1);
        else setCheckedBox((prev) => prev - 1);
    };

    return (
        <div className={styles.modalContainer}>
            <form onSubmit={handleSubmit}>
                {tagWarning && <p>Select at least one tag!</p>}

                <label>
                    <h3>Title</h3>
                    <input type="text" required />
                </label>

                <label>
                    <h3>Description</h3>
                    <input type="text" required />
                </label>

                <div>
                    <h3>Tags</h3>
                    <label>
                        <input
                            type="checkbox"
                            value="enhancement"
                            onChange={handleCheckboxChange}
                        />
                        <span>Enhancement</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="ui"
                            onChange={handleCheckboxChange}
                        />
                        <span>Ui</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="ux"
                            onChange={handleCheckboxChange}
                        />
                        <span>Ux</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="bug"
                            onChange={handleCheckboxChange}
                        />
                        <span>Bug</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="feature"
                            onChange={handleCheckboxChange}
                        />
                        <span>Feature</span>
                    </label>
                </div>

                <span>
                    <button type="button">Cancel</button>
                    <button type="submit">Add</button>
                </span>
            </form>
        </div>
    );
}
