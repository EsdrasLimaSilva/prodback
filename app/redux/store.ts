import { configureStore } from "@reduxjs/toolkit";

import tagReducer from "./slices/tagSlice";
import feedbackReducer from "./slices/feedbackSlice";

const store = configureStore({
    reducer: {
        tags: tagReducer,
        feedback: feedbackReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
