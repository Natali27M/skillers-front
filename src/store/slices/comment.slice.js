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

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        updateError: null,
        error: null,
        status: null
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
        [createComment.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
    }
});

const commentReducers = commentSlice.reducer;

export default commentReducers;
