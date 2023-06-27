import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Props {
    targetComment: string;
    rep: {
        target: boolean;
        id: string;
    };
}

const initialState = {
    targetComment: "",
    rep: {
        target: false,
        id: "",
    },
};

const replySlice = createSlice({
    name: "replySlice",
    initialState,
    reducers: {
        setTargetComment(state, action: PayloadAction<Props>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setTargetComment } = replySlice.actions;
export const selectReply = (store: RootState) => store.reply;

export default replySlice.reducer;
