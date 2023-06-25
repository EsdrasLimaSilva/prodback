"use client";

import styles from "@/styles/AddFeedbackModal.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Feedbck } from "../redux/slices/feedbackSlice";

import { ImSpinner8 } from "react-icons/im";

interface Props {
    hideModal: () => void;
}

export default function AddFeedbackModal({ hideModal }: Props) {
    const [checkedBox, setCheckedBox] = useState<string[]>([]);
    const [tagWarning, setTagWarning] = useState(false);
    const [postingFeedback, setPostingFeedback] = useState({
        posting: false,
        message: "Posting Feedback",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (!checkedBox.length) {
                setTagWarning(true);
                setTimeout(() => {
                    setTagWarning(false);
                }, 4000);
            } else {
                setPostingFeedback((prev) => ({ ...prev, posting: true }));

                const form = e.target as HTMLFormElement;
                const title = (form[0] as HTMLInputElement).value;
                const description = (form[1] as HTMLInputElement).value;

                const feedback: Feedbck = {
                    _id: "",
                    description,
                    title,
                    comments: [],
                    date: String(new Date()),
                    tags: [...checkedBox],
                    ups: 0,
                };

                await fetch(
                    "http://localhost:3000/api/feedbacks?tag=feedbacks",
                    {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(feedback),
                    }
                );

                setPostingFeedback((prev) => ({
                    ...prev,
                    message: "Success!",
                }));
            }
        } catch (err) {
            setPostingFeedback((prev) => ({
                ...prev,
                message: "Something went wrong",
            }));
        } finally {
            setTimeout(() => {
                hideModal();
                setPostingFeedback((prev) => ({ ...prev, posting: false }));
            }, 3000);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent) => {
        const box = e.target as HTMLInputElement;

        if (box.checked) setCheckedBox((prev) => [...prev, box.value]);
        else
            setCheckedBox((prev) => {
                const newState = prev.filter((tag) => tag != box.value);

                return newState;
            });
    };

    if (postingFeedback.posting) {
        return (
            <div className={styles.modalContainer}>
                <span className={styles.spinner}>
                    <p>{postingFeedback.message}</p>
                    <ImSpinner8 />
                </span>
            </div>
        );
    }

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
                    <button type="button" onClick={hideModal}>
                        Cancel
                    </button>
                    <button type="submit">Add</button>
                </span>
            </form>
        </div>
    );
}
