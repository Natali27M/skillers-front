import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {exercisesProxyServices, exercisesServices} from '../../services';

export const getExercises = createAsyncThunk(
    'exercisesSlice/getExercises',
    async ({testId}, {rejectWithValue}) => {
        try {
            return await exercisesServices.getTestExercises(testId);
            // return await exercisesProxyServices.getTestExercises(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getProxyExercises = createAsyncThunk(
    'exercisesSlice/getProxyExercises',
    async ({testId}, {rejectWithValue}) => {
        try {
            // return await exercisesServices.getTestExercises(testId);
            return await exercisesProxyServices.getTestExercises(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const checkProxyResults = createAsyncThunk(
    'exercisesSlice/checkProxyResults',
    async (data, {rejectWithValue}) => {
        try {
            return await exercisesProxyServices.checkExercises(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const exercisesSlice = createSlice({
    name: 'exercisesSlice',
    initialState: {
        status: null,
        error: null,
        exercises: [],
        variants: [],
        testFailed: false,
        result: null,
        timeToPush: false,
        checked: false
    },

    reducers: {
        pushResults: (state, action) => {
            state.variants.push(action.payload);
        },

        makeTimeToPush: (state) => {
            state.timeToPush = true;
        },

        checkResults: (state) => {
            /*const allExercises = state.exercises.length;
            let correct = 0;
            for (const variant of state.variants) {
                if (variant?.attributes?.correct) {
                    correct++;
                }
            }
            if (correct / allExercises < 0.8) {
                state.testFailed = true;
            } else {
                state.result = {correct, allExercises};
            }
            state.checked = true;
            state.timeToPush = false;
            state.variants = [];*/
        },

        clear: (state) => {
            state.variants = [];
            state.result = null;
            state.timeToPush = false;
            state.checked = false;
            state.testFailed = false;
        }
    },

    extraReducers: {
        [checkProxyResults.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            const allExercises = state.exercises.length;

            const correct = action.payload.result;

            if (action?.payload?.failed) {
                state.testFailed = true;
            } else {
                state.exercises = action.payload.apiExercises.data;
                state.result = {correct, allExercises};
            }

            state.checked = true;
            state.timeToPush = false;
        },

        [getExercises.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.exercises = action.payload;
        },

        [getProxyExercises.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.exercises = action.payload;
        },

        [getProxyExercises.pending]: (state) => {
            state.status = 'pending';
            state.exercises = [];
            state.variants = [];
        }
    }

});

const exercisesReducers = exercisesSlice.reducer;

export const {pushResults, makeTimeToPush, clear, checkResults} = exercisesSlice.actions;

export default exercisesReducers;