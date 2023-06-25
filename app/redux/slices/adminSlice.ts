import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    user: {
        name: "admin",
        lastname: "",
    },

    username: "@admin",
    imageurl: "https://i.ibb.co/cvGQf8F/admin.jpg",
};

const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {},
});

export const selectAdmin = (store: RootState) => store.admin;

export default adminSlice.reducer;
