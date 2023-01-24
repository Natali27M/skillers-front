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

export const getPostById = createAsyncThunk(
    'postSlice/getPostById',
    async ({postId}) => {
        try {
            return await postsServices.getPostById(postId);
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
        posts: {},
        notifications: [],
        postById: null
    },

    reducers: {
        makeNotification: (state, action) => {
            state.notifications = action.payload;
        },
    },

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

        [getPostById.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.postById = action.payload;
        },

        [getPostById.pending]: (state) => {
            state.status = 'pending';
        },

        [getPostById.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
});

const postReducers = postSlice.reducer;

export const {makeNotification} = postSlice.actions;

export default postReducers;
