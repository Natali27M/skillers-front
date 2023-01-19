import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {postsServices} from '../../services/posts.service';

export const createPost = createAsyncThunk(
    'postSlice/createPost',
    async (obj,{rejectWithValue}) => {
        try {
            return await postsServices.createPost(obj);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getAllPosts = createAsyncThunk(
    'postSlice/getAllPosts',
    async () => {
        try {
            return await postsServices.getAllPosts();
        } catch (error) {
            return error.message;
        }
    }
);

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        updateError: null,
        error: null,
        status: null,
        posts: {}
    },

    reducers: {},

    extraReducers: {
        [getAllPosts.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllPosts.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.posts = action.payload;
        },
    }
});

const postReducers = postSlice.reducer;

export default postReducers;
