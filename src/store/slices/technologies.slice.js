import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {TechnologiesServices} from "../../services/technologies.services";

export const getTechnologies = createAsyncThunk(
    'TechnologiesSlice/getTechnologies',
    async (_, {rejectWithValue}) => {
        try {
            return TechnologiesServices.getTechnologies();
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const TechnologiesSlice = createSlice({
    name: "TechnologiesSlice",
    initialState: {
        status: null,
        error: null,
        technologies: {},
    },
    extraReducers: {
        [getTechnologies.pending]: (state) => {
            state.status = 'pending';
        },
        [getTechnologies.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getTechnologies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.technologies = action.payload;
        },
    },
});

const technologiesReducers = TechnologiesSlice.reducer;

export default technologiesReducers;
