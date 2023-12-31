import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {feedbackService} from '../../services';

export const createFeedback = createAsyncThunk(
    'feedbackSlice/createFeedback',
    async (obj, {rejectWithValue}) => {
        try {
            return await feedbackService.sendFeedback(obj);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getFeedback = createAsyncThunk(
    'feedbackSlice/getFeedback',
    async (pageNumber, {rejectWithValue}) => {
        try {
            return await feedbackService.getFeedbackPaginated(pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    'feedbackSlice/deleteFeedback',
    async (id, {rejectWithValue}) => {
        try {
            return await feedbackService.deleteFeedback(id);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);
export const updateIsApproved = createAsyncThunk(
    'feedbackSlice/updateIsApproved',
    async (obj, {rejectWithValue}) => {
        try {
            const {id, booleanValue} = obj;
            return feedbackService.updateIsApproved(id, booleanValue);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getFeedbackPaginatedConfirmed = createAsyncThunk(
    'feedbackSlice/getFeedbackPaginatedConfirmed',
    async (_, {rejectWithValue}) => {
        try {
            return feedbackService.getFeedbackPaginatedConfirmed();
        } catch (e) {
            rejectWithValue(e);
        }
    }
)

const feedbackSlice = createSlice({
    name: 'feedbackSlice',
    initialState: {
        status: null,
        error: null,
        isDelete: false,
        isConfirmed: false,
        feedbackPage: {},
        confirmedFeedbackPage: {}
    },
    extraReducers: {
        [createFeedback.pending]: (state) => {
            state.status = 'pending';
        },
        [createFeedback.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getFeedback.pending]: (state) => {
            state.status = 'pending';
        },
        [getFeedback.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getFeedback.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.feedbackPage = action.payload;
        },

        [deleteFeedback.pending]: (state) => {
            state.status = 'pending';
        },
        [deleteFeedback.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteFeedback.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDelete = !state.isDelete;
        },
        [updateIsApproved.pending]: (state) => {
            state.status = 'pending';
        },
        [updateIsApproved.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateIsApproved.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isConfirmed = !state.isConfirmed;
        },
        [getFeedbackPaginatedConfirmed.pending]: (state) => {
            state.status = 'pending';
        },
        [getFeedbackPaginatedConfirmed.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getFeedbackPaginatedConfirmed.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.confirmedFeedbackPage = action.payload;
        }
    }
});


const feedbackReducers = feedbackSlice.reducer;


export default feedbackReducers;
