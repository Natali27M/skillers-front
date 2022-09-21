import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {exercisesServices} from '../../services';

export const getExercises = createAsyncThunk(
    'exercisesSlice/getTests',
    async ({testId}, {rejectWithValue}) => {
        try {
            return await exercisesServices.getTestExercises(testId);
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
            const allExercises = state.exercises.length;
            let correct = 0;
            for (const variant of state.variants) {
                if (variant?.attributes?.correct) {
                    correct++;
                }
            }
            state.timeToPush = false;
            state.checked = true;
            state.result = {correct, allExercises};
            state.variants = [];
        },

        clear: (state) => {
            state.variants = [];
            state.result = null;
            state.timeToPush = false;
            state.checked = false;
        }
    },

    extraReducers: {
        [getExercises.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.exercises = action.payload;
        },

        [getExercises.pending]: (state) => {
            state.status = 'pending';
            state.exercises = [];
            state.variants = [];
        }
    }

});

const exercisesReducers = exercisesSlice.reducer;

export const {pushResults, makeTimeToPush, clear, checkResults} = exercisesSlice.actions;

export default exercisesReducers;