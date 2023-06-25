"use client";

import { useDispatch, useSelector } from "react-redux";
import { Feedback } from "../page";
import FeedbackCard from "./FeedbackCard";
import { selectTag } from "../redux/slices/tagSlice";
import { useEffect } from "react";
import { pushFeedbcks, selectFeed } from "../redux/slices/feedSlice";
import AddFeedbackModal from "./AddFeedbackModal";

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
    const { all } = useSelector(selectFeed);
    const { tagsActive } = useSelector(selectTag);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pushFeedbcks(feedbacks));
    }, []);

    return (
        <>
            <AddFeedbackModal />
            {all.map((fbck) => {
                const feed = { ...fbck, _id: String(fbck._id) };
                let included = tagsActive.includes("all");
                if (!included) {
                    for (let i = 0; i < fbck.tags.length && !included; i++) {
                        included = tagsActive.includes(fbck.tags.at(i)!);
                    }
                }
                if (!included) return;

                return <FeedbackCard key={String(fbck._id)} feedback={feed} />;
            })}
        </>
    );
}
