import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    officersList: []
};

const OfficersSlice = createSlice({
    name: "officers",
    initialState: initialState,
    reducers: {
        addOfficers: (state, action) => {
            state.officersList = action.payload;
        }
    },
})

export const { addOfficers } = OfficersSlice.actions;

export default OfficersSlice.reducer;
