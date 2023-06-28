import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Feedbck } from "@/types";
import { RootState } from "../store";
import { Feedback } from "@/types";

interface Props {
    all: Feedback[];
}

const initialState: Props = {
    all: [],
};

const orderByDate = (feed: Feedback[]) => {
    feed.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

const orderByUps = (feed: Feedback[]) => {
    feed.sort((a, b) => b.ups - a.ups);
};

const feedSlice = createSlice({
    name: "feedSlice",
    initialState,
    reducers: {
        setFeedbacks(state, action: PayloadAction<Feedback[]>) {
            state.all = [...action.payload];
            orderByDate(state.all);
        },

        orderFeed(state, action: PayloadAction<"date" | "ups">) {
            if (action.payload === "date") orderByDate(state.all);
            else if (action.payload === "ups") orderByUps(state.all);
        },
    },
});

export const { setFeedbacks, orderFeed } = feedSlice.actions;
export const selectFeed = (store: RootState) => store.feed;

export default feedSlice.reducer;
