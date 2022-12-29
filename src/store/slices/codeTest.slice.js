import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {codeTestServices} from '../../services';

export const getOneCodeTest = createAsyncThunk(
    'codeTestSlice/getOneCodeTest',
    async (testId, {rejectWithValue}) => {
        try {
            return await codeTestServices.getOneTest(testId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCodeTestsByUser = createAsyncThunk(
    'codeTestSlice/getCodeTestsByUser',
    async ({pageNum, authorId}, {rejectWithValue}) => {
        try {
            return await codeTestServices.getTestsByUserPaginated(authorId, pageNum);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCodeTest = createAsyncThunk(
    'codeTestSlice/updateCodeTest',
    async ({testId, data}, {rejectWithValue}) => {
        try {
            return await codeTestServices.updateTest(testId, data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteCodeTest = createAsyncThunk(
    'codeTestSlice/deleteCodeTest',
    async (testId, {rejectWithValue}) => {
        try {
            return await codeTestServices.deleteTest(testId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const approveCodeTest = createAsyncThunk(
    'codeTestSlice/approveCodeTest',
    async (testId, {rejectWithValue}) => {
        try {
            return await codeTestServices.updateTest(testId, {isApproved: true});
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createCodeTest = createAsyncThunk(
    'codeTestSlice/createCodeTest',
    async (data, {rejectWithValue}) => {
        try {
            return await codeTestServices.createCodeTest(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createCodeRate = createAsyncThunk(
    'codeTestSlice/createCodeRate',
    async ({userId, testId, rate}, {rejectWithValue}) => {
        try {
            return await codeTestServices.createCodeRate(userId, testId, rate);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserByCodeTestRate = createAsyncThunk(
    'codeTestSlice/getUserByCodeTestRate',
    async ({userId, testId}, {rejectWithValue}) => {
        try {
            return await codeTestServices.getUserRateByCodeTest(userId, testId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCodeTestsPaginated = createAsyncThunk(
    'codeTestSlice/getCodeTestsPaginated',
    async ({techId, pageNum, sortParams, order}, {rejectWithValue}) => {
        try {
            return await codeTestServices.getCodeTestsPaginated(techId, pageNum, sortParams, order);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getCodeTestsForApprove = createAsyncThunk(
    'codeTestSlice/getCodeTestsForApprove',
    async (pageNum, {rejectWithValue}) => {
        try {
            return await codeTestServices.getCodeTestsForApprove(pageNum);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCodeTestsByQueryPaginated = createAsyncThunk(
    'codeTestSlice/getCodeTestsByQueryPaginated',
    async ({query, pageNum}, {rejectWithValue}) => {
        try {
            return await codeTestServices.getCodeTestsByQueryPaginated(query, pageNum);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const codeTestSlice = createSlice({
    name: 'codeTestSlice',
    initialState: {
        status: null,
        updateTestStatus: null,
        error: null,
        oneCodeTest: null,
        codeTestPage: null,
        codeTestPageForApprove: null,
        userCodeTestRate: null,
        codeTestsByUser: null
    },
    reducers: {
        clearCodeTestUserData: (state) => {
            state.userCodeTestRate = null;
        }
    },
    extraReducers: {
        [getOneCodeTest.pending]: (state) => {
            state.status = 'pending';
        },

        [getOneCodeTest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getOneCodeTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneCodeTest = action.payload;
        },
        [getCodeTestsByUser.pending]: (state) => {
            state.status = 'pending';
        },

        [getCodeTestsByUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getCodeTestsByUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.codeTestsByUser = action.payload;
        },
        [approveCodeTest.pending]: (state) => {
            state.status = 'pending';
        },

        [approveCodeTest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [approveCodeTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneCodeTest = action.payload;
        },

        [createCodeTest.pending]: (state) => {
            state.status = 'pending';
        },

        [createCodeTest.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [createCodeTest.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneCodeTest = action.payload;
        },

        [updateCodeTest.pending]: (state) => {
            state.updateTestStatus = 'pending';
        },

        [updateCodeTest.rejected]: (state, action) => {
            state.updateTestStatus = 'rejected';
            state.error = action.payload;
        },

        [updateCodeTest.fulfilled]: (state, action) => {
            state.updateTestStatus = 'fulfilled';
            state.oneCodeTest = action.payload;
        },

        [getCodeTestsPaginated.pending]: (state) => {
            state.status = 'pending';
        },

        [getCodeTestsPaginated.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getCodeTestsPaginated.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.codeTestPage = action.payload;
        },
        [getCodeTestsForApprove.pending]: (state) => {
            state.status = 'pending';
        },

        [getCodeTestsForApprove.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getCodeTestsForApprove.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.codeTestPageForApprove = action.payload;
        },

        [getCodeTestsByQueryPaginated.pending]: (state) => {
            state.status = 'pending';
        },

        [getCodeTestsByQueryPaginated.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getCodeTestsByQueryPaginated.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.codeTestPage = action.payload;
        },

        [createCodeRate.pending]: (state) => {
            state.status = 'pending';
        },

        [createCodeRate.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [createCodeRate.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userCodeTestRate = action?.payload?.data;
        },

        [getUserByCodeTestRate.pending]: (state) => {
            state.status = 'pending';
        },

        [getUserByCodeTestRate.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUserByCodeTestRate.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userCodeTestRate = action?.payload?.data[0];
        },
    }
});

const codeTestReducers = codeTestSlice.reducer;

export const {clearCodeTestUserData} = codeTestSlice.actions

export default codeTestReducers;

