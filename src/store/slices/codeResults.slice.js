import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {codeResultsServices} from '../../services';

export const createCodeResult = createAsyncThunk(
    'codeResultsSlice/createCodeResult',
    async (data, {rejectWithValue}) => {
        try {
            return await codeResultsServices.createResult(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserCodeResults = createAsyncThunk(
    'codeResultsSlice/getUserCodeResults',
    async ({userId, pageNum}, {rejectWithValue}) => {
        try {
            return await codeResultsServices.getUserCodeResults(userId, pageNum);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getOneCodeResult = createAsyncThunk(
    'codeResultsSlice/getOneCodeResult',
    async (resultId, {rejectWithValue}) => {
        try {
            return await codeResultsServices.getOneCodeResult(resultId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCodeResultsForEvaluating = createAsyncThunk(
    'codeResultsSlice/getCodeResultsForEvaluating',
    async ({authorId, pageNum}, {rejectWithValue}) => {
        try {
            return await codeResultsServices.getCreatorResultForEvaluate(authorId, pageNum);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const changeCodeResult = createAsyncThunk(
    'codeResultsSlice/changeCodeResult',
    async ({resultId, data}, {rejectWithValue}) => {
        try {
            return await codeResultsServices.changeCodeResult(resultId, data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const codeResultsSlice = createSlice({
    name: 'codeResultsSlice',
    initialState: {
        status: null,
        error: null,
        userResult: null,
        userCodeResultPage: null,
        resultPageForEvaluate: null,
        oneCodeResult: null
    }, extraReducers: {
        [createCodeResult.pending]: (state) => {
            state.status = 'pending';
        },

        [createCodeResult.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [createCodeResult.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userResult = action.payload;
        },

        [getUserCodeResults.pending]: (state) => {
            state.status = 'pending';
        },

        [getUserCodeResults.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUserCodeResults.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userCodeResultPage = action.payload;
        },

        [getCodeResultsForEvaluating.pending]: (state) => {
            state.status = 'pending';
        },

        [getCodeResultsForEvaluating.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getCodeResultsForEvaluating.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.resultPageForEvaluate = action.payload;
        },

        [getOneCodeResult.pending]: (state) => {
            state.status = 'pending';
        },

        [getOneCodeResult.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getOneCodeResult.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneCodeResult = action.payload;
        },

        [changeCodeResult.pending]: (state) => {
            state.status = 'pending';
        },

        [changeCodeResult.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [changeCodeResult.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.oneCodeResult = action.payload;
        },
    }
});


const codeResultsReducers = codeResultsSlice.reducer;

export default codeResultsReducers;