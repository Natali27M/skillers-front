import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {notificationsServices} from '../../services';

export const getAllNotifications = createAsyncThunk(
    'notificationSlice/getAllNotifications',
    async ({userId},{rejectWithValue}) => {
        try {
            return await notificationsServices.getAllNotifications(userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getNoReadNotifications = createAsyncThunk(
    'notificationSlice/noReadNotifications',
    async ({userId},{rejectWithValue}) => {
        try {
            return await notificationsServices.getNoReadNotifications(userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getNoOpenedNotifications = createAsyncThunk(
    'notificationSlice/noOpenedNotifications',
    async ({userId},{rejectWithValue}) => {
        try {
            return await notificationsServices.getNoOpenedNotifications(userId);
        } catch (error) {
            return rejectWithValue(error.message);
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
        noReadNotifications: [],
        noOpenNotifications: [],
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

        [getNoReadNotifications.pending]: (state) => {
            state.status = 'pending';
        },
        [getNoReadNotifications.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getNoReadNotifications.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.noReadNotifications = action.payload.data;
        },

        [getNoOpenedNotifications.pending]: (state) => {
            state.status = 'pending';
        },
        [getNoOpenedNotifications.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getNoOpenedNotifications.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.noOpenNotifications = action.payload.data;
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
