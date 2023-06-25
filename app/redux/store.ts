import { configureStore } from "@reduxjs/toolkit";

import tagReducer from "./slices/tagSlice";
import feedbackReducer from "./slices/feedbackSlice";
import feedReducer from "./slices/feedSlice";
import adminReducer from "./slices/adminSlice";

const store = configureStore({
    reducer: {
        tags: tagReducer,
        feedback: feedbackReducer,
        feed: feedReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
