"use client";

import { useDispatch, useSelector } from "react-redux";
import FeedbackCard from "./FeedbackCard";
import { selectTag } from "../redux/slices/tagSlice";
import { useEffect } from "react";
import { setFeedbacks, selectFeed } from "../redux/slices/feedSlice";
import { Feedback } from "@/types";

/*
This component contains all the feedback. It's separeted beacuse the home page is server side rendering, and to allow some features (ass dispatching feedbacks to order) we need the "use client" directive
*/
export default function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
    const { all } = useSelector(selectFeed);
    const { tagsActive } = useSelector(selectTag);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFeedbacks(feedbacks));
    }, []);

    return (
        <>
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
