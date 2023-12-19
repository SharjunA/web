import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
        },
        addToken: (state, action) => {
            state.token = action.payload;
        },
    },
})

export const { addUserData, addToken } = AuthSlice.actions;

export default AuthSlice.reducer;
