import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {answersServices} from "../../services";


export const createAnswer = createAsyncThunk(
    'createAnswer/answersSlice',
    async (answer, {rejectWithValue}) => {
        try {
            return answersServices.createAnswer(answer);
        } catch (e) {
            rejectWithValue(e);
        }
    },
)

export const answersSlice = createSlice({
    name: 'answersSlice',
    initialState: {
        status: '',
        error: null,
        answer: {}
    },
    extraReducers: {
        [createAnswer.pending]: (state) => {
            state.status = 'pending';
        },
        [createAnswer.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createAnswer.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.answer = action.payload;
        },
    },
});

const answersReducers = answersSlice.reducer;
export default answersReducers;
