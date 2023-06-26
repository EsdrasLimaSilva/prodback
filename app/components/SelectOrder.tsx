"use client";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { selectFeddback } from "../redux/slices/feedbackSlice";
import { orderFeed } from "../redux/slices/feedSlice";

/*
This the select component to choose the critery of order all the feedbacks on the home page
*/
export default function SelectOrder() {
    const dispatch = useDispatch();

    const orderFeedbacks = (e: ChangeEvent) => {
        const selectElement = e.target as HTMLSelectElement;
        const value = selectElement.value as "date" | "ups";

        dispatch(orderFeed(value));
    };

    return (
        <select defaultValue="date" onChange={orderFeedbacks}>
            <option value="date">Sort by: most recent</option>
            <option value="ups">Sort by: most ups</option>
        </select>
    );
}
