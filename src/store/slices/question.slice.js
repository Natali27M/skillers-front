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

export const getAllQuestions = createAsyncThunk(
    'questionSlice/getAllQuestions',
    async ({page, query}, {rejectWithValue}) => {
        try {
            return questionServices.getAllQuestions(page, query);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const getOneQuestion = createAsyncThunk(
    'questionSlice/getOneQuestion',
    async (id, {rejectWithValue}) => {
        try {
            return questionServices.getOneQuestion(id);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const deleteQuestion = createAsyncThunk(
    'questionSlice/deleteQuestion',
    async (id, {rejectWithValue}) => {
        try {
            return questionServices.deleteQuestion(id);
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const questionSlice = createSlice({
    name: 'questionSlice',
    initialState: {
        status: '',
        error: null,
        isDeleteQuestion: false,
        isUpdateQuestion: false,
        questions: {},
        createdQuestion: {},
        oneQuestion: {},
    },
    extraReducers: {
        [createQuestion.pending]: (state) => {
            state.status = 'pending';
        },
        [createQuestion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createQuestion.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            localStorage.setItem('question', JSON.stringify(action.payload.data));
            state.createdQuestion = action.payload.data;
        },
        [getAllQuestions.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllQuestions.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getAllQuestions.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.questions = action.payload;
        },
        [getOneQuestion.pending]: (state) => {
            state.status = 'pending';
        },
        [getOneQuestion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getOneQuestion.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneQuestion = action.payload.data;
        },
        [deleteQuestion.pending]: (state) => {
            state.status = 'pending';
        },
        [deleteQuestion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteQuestion.fulfilled]: (state) => {
            state.status = 'fulfilled';
            state.isDeleteQuestion = !state.isDeleteQuestion;
        },
    },
});

const questionsReducers = questionSlice.reducer;

export default questionsReducers;
