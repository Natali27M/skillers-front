import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {commentsServices} from '../../services/comments.service';

export const createComment = createAsyncThunk(
    'commentSlice/createComment',
    async (obj,{rejectWithValue}) => {
        try {
            return await commentsServices.createComment(obj);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateComment = createAsyncThunk(
    'commentSlice/updateComment',
    async ({data, commentId}, {rejectWithValue}) => {
        try {
            return await commentsServices.updateComment(data, commentId);
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const deleteComment = createAsyncThunk(
    'commentSlice/deleteComment',
    async (commentId, {rejectWithValue}) => {
        try {
            return await commentsServices.deleteComment(commentId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        updateError: null,
        error: null,
        status: null,
        isDeletedComment: false,
        isUpdateComment: false
    },

    reducers: {},

    extraReducers: {
        [createComment.pending]: (state) => {
            state.status = 'pending';
        },
        [createComment.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createComment.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            localStorage.setItem('comment', JSON.stringify(action.payload.data));
        },

        [updateComment.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateComment.rejected]: (state, action) => {
            state.status = 'rejected';
            state.updateError = action;
        },
        [updateComment.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.updateError = null;
            state.isUpdateComment = !state.isUpdateComment;
        },

        [deleteComment.pending]: (state) => {
            state.status = "pending";
        },
        [deleteComment.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteComment.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedComment = !state.isDeletedComment;
        },
    }
});

const commentReducers = commentSlice.reducer;

export default commentReducers;
