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
    }
);
export const getRecruiterByUserIdNotConfirmed = createAsyncThunk(
    'recruiterSlice/getRecruiterByUserIdNotConfirmed',
    async (userId, {rejectWithValue}) => {
        try {
            return recruiterService.getRecruiterByUserIdNotConfirmed(userId)
        } catch (e) {
            rejectWithValue(e)
        }
    }
);

export const getAllRecruiters = createAsyncThunk(
    'recruiterSlice/getAllRecruiters',
    async (_, {rejectWithValue}) => {
        try {
            return recruiterService.getAllRecruiters()
        } catch (e) {
            rejectWithValue(e);
        }
    }
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

        [getRecruiterByUserIdNotConfirmed.pending]: (state) => {
            state.status = 'pending';
        },
        [getRecruiterByUserIdNotConfirmed.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getRecruiterByUserIdNotConfirmed.fulfilled]: (state, action) => {
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
    },
});

const recruiterReducers = recruiterSlice.reducer;
export default recruiterReducers;
