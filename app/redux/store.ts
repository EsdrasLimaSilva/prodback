import { configureStore } from "@reduxjs/toolkit";

import tagReducer from "./slices/tagSlice";
import feedbackReducer from "./slices/feedbackSlice";
import feedReducer from "./slices/feedSlice";
import adminReducer from "./slices/adminSlice";
import replyReducer from "./slices/replySlice";

const store = configureStore({
    reducer: {
        tags: tagReducer,
        feedback: feedbackReducer,
        feed: feedReducer,
        admin: adminReducer,
        reply: replyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
