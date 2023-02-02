import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {categoriesServices} from "../../services";

export const getAllCategories = createAsyncThunk(
    'categoriesSlice/getAllCategories',
    async (_, {rejectWithValue}) => {
        try {
            return categoriesServices.getAllCategories();
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        errors: null,
        status: '',
        isDeleted: false,
        categories: {},
    },
    extraReducers: {
        [getAllCategories.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllCategories.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.categories = action.payload;
        },
    },
});

const categoriesReducers = categoriesSlice.reducer;
export default categoriesReducers;
