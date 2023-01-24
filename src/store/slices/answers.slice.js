import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {answersServices} from "../../services";


export const createAnswer = createAsyncThunk(
    'answersSlice/createAnswer',
    async (answer, {rejectWithValue}) => {
        try {
            return answersServices.createAnswer(answer);
        } catch (e) {
            rejectWithValue(e);
        }
    },
)

export const deleteAnswer = createAsyncThunk(
    'answersSlice/deleteAnswer',
    async (id, {rejectWithValue}) => {
        try {
            return answersServices.deleteAnswer(id);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const answersSlice = createSlice({
    name: 'answersSlice',
    initialState: {
        status: '',
        error: null,
        isDeletedAnswer: false,
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
        [deleteAnswer.pending]: (state) => {
            state.status = 'pending';
        },
        [deleteAnswer.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteAnswer.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedAnswer = !state.isDeletedAnswer;
        },
    },
});

const answersReducers = answersSlice.reducer;
export default answersReducers;
