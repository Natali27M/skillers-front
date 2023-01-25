import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {notificationsServices} from '../../services';

export const getAllNotifications = createAsyncThunk(
    'notificationSlice/getAllNotifications',
    async () => {
        try {
            return await notificationsServices.getAllNotifications();
        } catch (error) {
            return error.message;
        }
    }
);

export const createNotification = createAsyncThunk(
    'notificationSlice/createNotification',
    async (obj,{rejectWithValue}) => {
        try {
            return await notificationsServices.createNotification(obj);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateNotification = createAsyncThunk(
    'notificationSlice/updateNotification',
    async ({data, notificationId}, {rejectWithValue}) => {
        try {
            return await notificationsServices.updateNotification(data, notificationId);
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const deleteNotification = createAsyncThunk(
    'notificationSlice/deleteNotification',
    async (notificationId, {rejectWithValue}) => {
        try {
            return await notificationsServices.deleteNotification(notificationId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: {
        updateError: null,
        error: null,
        status: null,
        notifications: [],
        isDeletedNotification: false,
        isUpdateNotification: false
    },

    reducers: {},

    extraReducers: {
        [getAllNotifications.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllNotifications.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getAllNotifications.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.notifications = action.payload.data;
        },

        [createNotification.pending]: (state) => {
            state.status = 'pending';
        },
        [createNotification.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createNotification.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },

        [updateNotification.pending]: (state) => {
            state.status = 'pending';
            state.error = null;
        },
        [updateNotification.rejected]: (state, action) => {
            state.status = 'rejected';
            state.updateError = action;
        },
        [updateNotification.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.updateError = null;
            state.isUpdateNotification = !state.isUpdateNotification;
        },

        [deleteNotification.pending]: (state) => {
            state.status = "pending";
        },
        [deleteNotification.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteNotification.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedNotification = !state.isDeletedNotification;
        },
    }
});

const notificationReducers = notificationSlice.reducer;

export default notificationReducers;
