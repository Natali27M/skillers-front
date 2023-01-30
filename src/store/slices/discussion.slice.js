import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {discussionServices} from "../../services";


export const createOpinion = createAsyncThunk(
    'discussionSlice/createComment',
    async (opinion, {rejectWithValue}) => {
        try {
            return discussionServices.createOpinion(opinion);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const deleteOpinion = createAsyncThunk(
    'discussionSlice/deleteOpinion',
    async (id, {rejectWithValue}) => {
        try {
            return discussionServices.deleteOpinion(id);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const discussionSlice = createSlice({
    name: "discussionSlice",
    initialState: {
        status: '',
        errors: null,
        isDeletedOpinion: false,
    },
    extraReducers: {
        [createOpinion.pending]: (state) => {
            state.status = 'pending';
        },
        [createOpinion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },
        [createOpinion.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
        [deleteOpinion.pending]: (state) => {
            state.status = 'pending';
        },
        [deleteOpinion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },
        [deleteOpinion.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedOpinion = !state.isDeletedOpinion;
        },
    },
});

const discussionReducers = discussionSlice.reducer;
export default discussionReducers;
