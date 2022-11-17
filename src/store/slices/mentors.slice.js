import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {mentorsService} from "../../services/mentors.service";

export const createMentor = createAsyncThunk(
    'mentorSlice/createMentor',
    async (mentor, {rejectWithValue}) => {
        try {
            return mentorsService.createMentor(mentor);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getMentorsPaginated = createAsyncThunk(
    'mentorSlice/getMentorsPaginated',
    async (pageNumber, {rejectWithValue}) => {
        try {
            return mentorsService.getMentorsPaginated(pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const MentorsSlice = createSlice({
    name: "mentorSlice",
    initialState: {
        status: null,
        error: null,
        isDeletedMentor: false,
        isConfirmedMentor: false,
        mentorPage: {},
        confirmedMentorPage: {}
    },
    extraReducers: {
        [createMentor.pending]: (state) => {
            state.status = 'pending';
        },
        [createMentor.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getMentorsPaginated.pending]: (state) => {
            state.status = 'pending';
        },
        [getMentorsPaginated.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getMentorsPaginated.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.mentorPage = action.payload;
        },
    }
})

const mentorReducers = MentorsSlice.reducer;

export default mentorReducers;
