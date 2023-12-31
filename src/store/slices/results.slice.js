import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {resultsServices} from '../../services/results.services';


export const getUserResults = createAsyncThunk(
    'resultsSlice/getUserResults',
    async ({userId, pageNum}, {rejectWithValue}) => {
        try {
            return await resultsServices.getUserResult(userId, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getResultsByTest = createAsyncThunk(
    'resultsSlice/getResultsByTest',
    async ({testId, pageNum}, {rejectWithValue}) => {
        try {
            return await resultsServices.geAllTestResults(testId, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getUserResultsAll = createAsyncThunk(
    'resultsSlice/getUserResultsAll',
    async (userId, {rejectWithValue}) => {
        try {
            return await resultsServices.getUserResultAll(userId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getUserByTestResults = createAsyncThunk(
    'resultsSlice/getUserByTestResults',
    async ({userId, testId}, {rejectWithValue}) => {
        try {
            return await resultsServices.getUserByTestResult(userId, testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const createUserResult = createAsyncThunk(
    'resultsSlice/createUserResult',
    async (data, {rejectWithValue}) => {
        try {
            return await resultsServices.createResult(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


const resultsSlice = createSlice({
    name: 'resultsSlice',
    initialState: {
        status: null,
        error: null,
        userResults: [],
        resultsByTest: [],
        userByTestResult: null,
        userResultsAll: [],
        isTestCompleted: false
    },

    reducers: {
        setTestComplete: (state) => {
            state.isTestCompleted = true;
        },
        clearResults: (state) => {
            state.isTestCompleted = false;
            state.userByTestResult = null;
        }
    },

    extraReducers: {
        [getUserResults.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userResults = action.payload;
        },

        [getResultsByTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.resultsByTest = action.payload;
        },

        [getUserResultsAll.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userResultsAll = action.payload;
        },

        [getUserResults.pending]: (state) => {
            state.status = 'pending';
        },

        [getUserResults.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getUserByTestResults.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userByTestResult = action.payload;
        },

        [getUserByTestResults.pending]: (state) => {
            state.status = 'pending';
        },

        [getUserByTestResults.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createUserResult.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [createUserResult.pending]: (state) => {
            state.status = 'pending';
        },

        [createUserResult.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
});

export const {setTestComplete, clearResults} = resultsSlice.actions;

const resultReducers = resultsSlice.reducer;

export default resultReducers;