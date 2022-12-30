import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {recruiterService} from "../../services/recruiter.service";


export const createRecruiter = createAsyncThunk(
    'recruiterSlice/createRecruiter',
    async (recruiter, {rejectWithValue}) => {
        try {
            return recruiterService.createRecruiter(recruiter);
        } catch (e) {
            rejectWithValue(e)
        }
    },
);
export const getRecruiterByUserId = createAsyncThunk(
    'recruiterSlice/getRecruiterByUserIdNotConfirmed',
    async (userId, {rejectWithValue}) => {
        try {
            return recruiterService.getRecruiterByUserId(userId)
        } catch (e) {
            rejectWithValue(e)
        }
    },
);

export const getAllRecruiters = createAsyncThunk(
    'recruiterSlice/getAllRecruiters',
    async (page, {rejectWithValue}) => {
        try {
            return recruiterService.getAllRecruiters(page);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);


export const deletedRecruiter = createAsyncThunk(
    'recruiterSlice/deletedRecruiter',
    async (id, {rejectWithValue}) => {
        try {
            return recruiterService.deletedRecruiter(id);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const updateIsConfirmed = createAsyncThunk(
    'recruiterSlice/updateIsConfirmed',
    async (recruiter, {rejectWithValue}) => {
        try {
            const {recruiterId, booleanValue} = recruiter;
            return recruiterService.updateRecruiter(recruiterId, booleanValue);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);


export const recruiterSlice = createSlice({
    name: "recruiterSlice",
    initialState: {
        status: null,
        error: null,
        isDeletedRecruiter: false,
        isConfirmedRecruiter: false,
        recruitersAll: {},
        recruitersConfirmed: {},
        notConfirmedRecruiter: {},
    },
    extraReducers: {
        [createRecruiter.pending]: (state) => {
            state.status = 'pending';
        },
        [createRecruiter.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createRecruiter.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
        [getRecruiterByUserId.pending]: (state) => {
            state.status = 'pending';
        },
        [getRecruiterByUserId.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getRecruiterByUserId.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.notConfirmedRecruiter = action.payload?.data[0];
        },
        [getAllRecruiters.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllRecruiters.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getAllRecruiters.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.recruitersAll = action.payload;
        },
        [updateIsConfirmed.pending]: (state) => {
            state.status = "pending";
        },
        [updateIsConfirmed.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateIsConfirmed.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isConfirmedRecruiter = !state.isConfirmedRecruiter;
        },
        [deletedRecruiter.pending]: (state) => {
            state.status = "pending";
        },
        [deletedRecruiter.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deletedRecruiter.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeletedRecruiter = !state.isDeletedRecruiter;
        },
    },
});

const recruiterReducers = recruiterSlice.reducer;
export default recruiterReducers;
