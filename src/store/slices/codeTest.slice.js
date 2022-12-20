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
        error: null,
        oneCodeTest: null,
        codeTestPage: null
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
    }
});

const codeTestReducers = codeTestSlice.reducer;

export default codeTestReducers;

