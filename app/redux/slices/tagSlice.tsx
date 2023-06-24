import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    tagsActive: ["All"],
};

const tagSlice = createSlice({
    name: "tagSlice",
    initialState,
    reducers: {
        addTag(state, action: PayloadAction<string>) {
            state.tagsActive.push(action.payload);
        },

        removeTag(state, action: PayloadAction<string>) {
            state.tagsActive = state.tagsActive.filter(
                (tag) => tag != action.payload
            );
        },
    },
});

export const { addTag, removeTag } = tagSlice.actions;
export const selectTag = (state: RootState) => state.tags;

export default tagSlice.reducer;
