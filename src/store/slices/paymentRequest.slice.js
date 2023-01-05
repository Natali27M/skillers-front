import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {paymentRequestsService} from "../../services";


export const createPaymentRequest = createAsyncThunk(
    'paymentRequestSlice/createPaymentRequest',
    async (paymentRequest, {rejectWithValue}) => {
        try {
            return paymentRequestsService.createPaymentRequest(paymentRequest);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const getAllPaymentRequests = createAsyncThunk(
    'paymentRequestSlice/getAllPaymentRequests',
    async (page, {rejectWithValue}) => {
        try {
            return paymentRequestsService.getAllPaymentRequests(page);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const confirmPaymentRequest = createAsyncThunk(
    'paymentRequestSlice/confirmPaymentRequest',
    async (paymentRequestId, {rejectWithValue}) => {
        try {
            return paymentRequestsService.confirmPaymentRequest(paymentRequestId);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);


export const deletePaymentRequest = createAsyncThunk(
    'paymentRequestSlice/deletePaymentRequest',
    async (paymentRequestId, {rejectWithValue}) => {
        try {
            return paymentRequestsService.deletePaymentRequest(paymentRequestId);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);


export const paymentRequestSlice = createSlice({
    name: 'paymentRequestSlice',
    initialState: {
        status: null,
        error: null,
        isDeletedPaymentRequest: false,
        isConfirmedPaymentRequest: false,
        paymentRequestsAll: {},
    },
    extraReducers: {
        [createPaymentRequest.pending]: (state) => {
            state.status = 'pending';
        },
        [createPaymentRequest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createPaymentRequest.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
        [getAllPaymentRequests.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllPaymentRequests.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getAllPaymentRequests.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.paymentRequestsAll = action.payload;
        },
        [confirmPaymentRequest.pending]: (state) => {
            state.status = 'pending';
        },
        [confirmPaymentRequest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [confirmPaymentRequest.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isConfirmedPaymentRequest = !state.isConfirmedPaymentRequest;
        },
        [deletePaymentRequest.pending]: (state) => {
            state.status = 'pending';
        },
        [deletePaymentRequest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deletePaymentRequest.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedPaymentRequest = !state.isDeletedPaymentRequest;
        },
    }
});


const paymentRequestReducers = paymentRequestSlice.reducer;
export default paymentRequestReducers;
