"use client";

import { HiLightBulb } from "react-icons/hi";
import SelectOrder from "./SelectOrder";

import styles from "@/styles/home.module.scss";
import { useState } from "react";
import AddFeedbackModal from "./AddFeedbackModal";

interface Props {
    numOfFeedbacks: number;
}

/*
This is the header of the feedbackl list. Handle the visibility of the "AddFeedbackModal"
*/
export default function FeedListHeader({ numOfFeedbacks }: Props) {
    const [visibleModal, setVisibleModal] = useState(false);

    const showModal = () => {
        setVisibleModal(true);
    };

    const hideModal = () => {
        setVisibleModal(false);
    };

    return (
        <>
            {visibleModal && <AddFeedbackModal hideModal={hideModal} />}
            <header
                data-testid="feedlistheader"
                className={styles.feedbacksHeader}
            >
                <span>
                    <HiLightBulb />
                    <h2>{numOfFeedbacks} suggestions</h2>
                </span>

                <SelectOrder />

                <button type="button" onClick={showModal}>
                    Add Feedback
                </button>
            </header>
        </>
    );
}
