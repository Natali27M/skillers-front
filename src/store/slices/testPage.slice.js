import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {testsServices} from '../../services';

export const getTests = createAsyncThunk(
    'testSlice/getTests',
    async ({techId, pageNum}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsPaginated(techId, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getTestsByQuery = createAsyncThunk(
    'testSlice/getTests',
    async ({query, pageNum}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsByQueryPaginated(query, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getTestsForApprove = createAsyncThunk(
    'testSlice/getTestsForApprove',
    async (pageNum, {rejectWithValue}) => {
        try {
            return await testsServices.gstTestsForApprove(pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getTechnology = createAsyncThunk(
    'testSlice/getTechnology',
    async ({techId}, {rejectWithValue}) => {
        try {
            return await testsServices.getTechnologyName(techId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getOneTest = createAsyncThunk(
    'testSlice/getOneTest',
    async ({testId}, {rejectWithValue}) => {
        try {
            return await testsServices.getOneTest(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const approveTest = createAsyncThunk(
    'testSlice/approveTest',
    async (testId, {rejectWithValue}) => {
        try {
            return await testsServices.approveTest(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const deleteTest = createAsyncThunk(
    'testSlice/deleteTest',
    async (testId, {rejectWithValue}) => {
        try {
            return await testsServices.deleteTest(testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


const testSlice = createSlice({
    name: 'testSlice',
    initialState: {
        status: null,
        error: null,
        tests: [],
        testsForApprove: [],
        technology: '',
        oneTest: {}
    },

    extraReducers: {
        [getTests.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.tests = action.payload;
        },

        [getTests.pending]: (state) => {
            state.status = 'pending';
            state.tests = null;
        },

        [getTestsByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.tests = action.payload;
        },

        [getTestsByQuery.pending]: (state) => {
            state.status = 'pending';
        },

        [getTestsForApprove.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.testsForApprove = action.payload;
        },

        [getTestsForApprove.pending]: (state) => {
            state.status = 'pending';
            state.tests = [];
        },

        [getTechnology.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.technology = action.payload;
        },

        [getTechnology.pending]: (state) => {
            state.status = 'pending';
        },

        [getOneTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneTest = action.payload;
        },

        [getOneTest.pending]: (state) => {
            state.status = 'pending';
            state.oneTest = {};
        },

        [approveTest.fulfilled]: (state) => {
            state.status = 'fulfilled';
        },

        [approveTest.pending]: (state) => {
            state.status = 'pending';
        },


        [deleteTest.pending]: (state) => {
            state.status = 'pending';
        }
    }

});

const testsReducers = testSlice.reducer;

export default testsReducers;