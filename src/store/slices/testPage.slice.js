import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {testsServices} from '../../services';

export const getTests = createAsyncThunk(
    'testSlice/getTests',
    async ({techId, pageNum, sortParams, order, ukr}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsPaginated(techId, pageNum, sortParams, order, ukr);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getTestsByQuery = createAsyncThunk(
    'testSlice/getTestsByQuery',
    async ({query, pageNum}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsByQueryPaginated(query, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);
export const getTestsByUser = createAsyncThunk(
    'testSlice/getTestsByUser',
    async ({authorId, pageNum}, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsByUserPaginated(authorId, pageNum);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getTestsForApprove = createAsyncThunk(
    'testSlice/getTestsForApprove',
    async (pageNum, {rejectWithValue}) => {
        try {
            return await testsServices.getTestsForApprove(pageNum);
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

export const rateTest = createAsyncThunk(
    'testSlice/rateTest',
    async ({testId, testObj}, {rejectWithValue}) => {
        try {
            return await testsServices.updateTest(testId, testObj);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const difficultTest = createAsyncThunk(
    'testSlice/difficultTest',
    async ({testId, difficultObj}, {rejectWithValue}) => {
        try {
            return await testsServices.updateTest(testId, difficultObj);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const getRateOfTest = createAsyncThunk(
    'testSlice/getRateOfTest',
    async ({testId, userId}, {rejectWithValue}) => {
        try {
            return await testsServices.getUserRateByTest(userId, testId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const createRateOfTest = createAsyncThunk(
    'testSlice/createRateOfTest',
    async ({testId, userId, rate}, {rejectWithValue}) => {
        try {
            return await testsServices.createUserRate(userId, testId, rate);
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
        testsByUser: [],
        testsForApprove: [],
        userTestRate: {},
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
        },

        [getTestsByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.tests = action.payload;
        },

        [getTestsByQuery.pending]: (state) => {
            state.status = 'pending';
        },

        [getTestsByUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.testsByUser = action.payload;
        },

        [getTestsByUser.pending]: (state) => {
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

        [getRateOfTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userTestRate = action.payload?.data[0];
        },

        [getRateOfTest.pending]: (state) => {
            state.status = 'pending';
        },

        [createRateOfTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userTestRate = action.payload?.data;
        },

        [createRateOfTest.pending]: (state) => {
            state.status = 'pending';
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
