"use client";

import { useSelector } from "react-redux";
import { Feedback } from "../page";
import FeedbackCard from "./FeedbackCard";
import { selectTag } from "../redux/slices/tagSlice";

export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
    const { tagsActive } = useSelector(selectTag);

    return (
        <>
            {feedbacks.map((fbck) => {
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
