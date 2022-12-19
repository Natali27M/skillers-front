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

const codeResultsSlice = createSlice({
    name: 'codeResultsSlice',
    initialState: {
        status: null,
        error: null,
        userResult: null,
        userCodeResultPage: null
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
    }
});


const codeResultsReducers = codeResultsSlice.reducer;

export default codeResultsReducers;