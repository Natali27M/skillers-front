import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ideasServices} from "../../services";


export const createIdea = createAsyncThunk(
    'ideasSlice/createIdea',
    async (idea, {rejectWithValue}) => {
        try {
            return ideasServices.createIdea(idea);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const getAllIdeas = createAsyncThunk(
    'ideasSlice/getAllIdeas',
    async ({page, query}, {rejectWithValue}) => {
        try {
            return ideasServices.getAllIdeas(page, query);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const ideasSlice = createSlice({
    name: 'ideasSlice',
    initialState: {
        status: '',
        errors: null,
        isDeletedIdea: false,
        ideas: {}
    },
    extraReducers: {
        [createIdea.pending]: (state) => {
            state.status = 'pending';
        },
        [createIdea.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },
        [createIdea.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            localStorage.setItem('idea', JSON.stringify(action.payload.data));
            state.ideas = action.payload;
        },
        [getAllIdeas.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllIdeas.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },
        [getAllIdeas.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.ideas = action.payload;
        },
    },
});

const ideasReducers = ideasSlice.reducer;
export default ideasReducers;
