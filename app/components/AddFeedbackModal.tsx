"use client";

import styles from "@/styles/AddFeedbackModal.module.scss";
import { Feedbck } from "@/types";
import { ChangeEvent, FormEvent, useState } from "react";

import { ImSpinner8 } from "react-icons/im";

interface Props {
    hideModal: () => void;
}

/**
 * This component is the modal that handle the creation of a new feedback. Its visibility is controlled by the "FeedListHeader" component
 */
export default function AddFeedbackModal({ hideModal }: Props) {
    const [checkedBox, setCheckedBox] = useState<string[]>([]);
    const [tagWarning, setTagWarning] = useState(false);
    const [postingFeedback, setPostingFeedback] = useState({
        posting: false,
        message: "Posting Feedback",
    });

    //Post the new feedback on mongoDb
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (!checkedBox.length) {
                //if no tags is select, a warning is show on the modal
                setTagWarning(true);
                setTimeout(() => {
                    setTagWarning(false);
                }, 4000);
            } else {
                //it will be posted if at least one tag is choose by the user

                setPostingFeedback((prev) => ({ ...prev, posting: true }));

                const form = e.target as HTMLFormElement;
                const title = (form[0] as HTMLInputElement).value;
                const description = (form[1] as HTMLInputElement).value;

                //creating the new feedback
                const feedback: Feedbck = {
                    _id: "",
                    description,
                    title,
                    comments: [],
                    date: String(new Date()),
                    tags: [...checkedBox],
                    ups: 0,
                };

                //making the post request. The "tag" param in the url is needed to revalidate the home page beause it's static generated.
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

                //if everything goes right, the success message is shown
                setPostingFeedback((prev) => ({
                    ...prev,
                    message: "Success!",
                }));
            }
        } catch (err) {
            //if something goes wrong, the error message is shown
            setPostingFeedback((prev) => ({
                ...prev,
                message: "Something went wrong",
            }));
        } finally {
            //resets the modal visbility and state
            setTimeout(() => {
                hideModal();
                setPostingFeedback((prev) => ({ ...prev, posting: false }));
            }, 3000);
        }
    };

    //control what tags are choose by the user
    const handleCheckboxChange = (e: ChangeEvent) => {
        const box = e.target as HTMLInputElement;

        if (box.checked) setCheckedBox((prev) => [...prev, box.value]);
        else
            setCheckedBox((prev) => {
                const newState = prev.filter((tag) => tag != box.value);

                return newState;
            });
    };

    //if feedback is posting, this spinner will be rendered insted of the form
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
