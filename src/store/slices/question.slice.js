import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {questionServices} from "../../services";


export const createQuestion = createAsyncThunk(
    'questionSlice/createQuestion',
    async (question, {rejectWithValue}) => {
        try {
            return questionServices.createQuestion(question);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);


export const questionSlice = createSlice({
    name: 'questionSlice',
    initialState: {
        status: null,
        error: null,
        isDeleteQuestion: false,
        isUpdateQuestion: false,
        questions: {},
    },
    extraReducers: {
        [createQuestion.pending]: (state) => {
            state.status = 'pending';
        },
        [createQuestion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createQuestion.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },
    },
});

const questionsReducers = questionSlice.reducer;

export default questionsReducers;
