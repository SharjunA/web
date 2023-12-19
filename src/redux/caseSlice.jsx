import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    caseDetail: [],
    stations: [],
};

const CaseDetailSlice = createSlice({
    name: "caseData",
    initialState: initialState,
    reducers: {
        addCaseDetail: (state, action) => {
            state.caseDetail = action.payload;
        },
        appendCaseDetail: (state, action) => {
            state.caseDetail = state.caseDetail.push(action.payload);
        },
        addStation : (state, action)=>{
            state.stations = action.payload;
        }
    }
});

export const { addCaseDetail, appendCaseDetail, addStation } = CaseDetailSlice.actions;

export default CaseDetailSlice.reducer;