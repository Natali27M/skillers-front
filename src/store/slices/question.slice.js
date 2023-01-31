import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {questionServices} from "../../services";
import {postsServices} from "../../services/posts.services";


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

export const updateQuestion = createAsyncThunk(
    'questionSlice/updateQuestion',
    async ({id, postId}, {rejectWithValue}) => {
        try {
            return questionServices.updateQuestion(id, postId);
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
    async ({id, postId}, {rejectWithValue}) => {
        try {
            const {message, error} = await questionServices.deleteAllAnswers(id);
            if (!message && error) {
                return rejectWithValue(error);
            }
            const {data} = await postsServices.deletePost(postId);
            if (data) {
                return questionServices.deleteQuestion(id);
            }
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
        [updateQuestion.pending]: (state) => {
            state.status = 'pending';
        },
        [updateQuestion.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateQuestion.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneQuestion = action.payload;
        },
    },
});

const questionsReducers = questionSlice.reducer;

export default questionsReducers;
