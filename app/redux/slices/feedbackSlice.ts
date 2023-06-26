import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Feedbck } from "@/types";

interface Props {
    feedback: Feedbck;
}

const initialState: Props = {
    feedback: {
        _id: "",
        title: "",
        description: "",
        tags: [],
        comments: [],
        ups: 0,
        date: "",
    },
};

const feedbackSlice = createSlice({
    name: "feedbackSlice",
    initialState,
    reducers: {
        setFeedback(state, action: PayloadAction<Feedbck>) {
            state.feedback = action.payload;
        },
    },
});

export const { setFeedback } = feedbackSlice.actions;
export const selectFeddback = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
