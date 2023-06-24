import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./slices/tagSlice";

const store = configureStore({
    reducer: {
        tags: tagReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
