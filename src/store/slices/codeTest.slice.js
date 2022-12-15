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


const codeTestSlice = createSlice({
    name: 'codeTestSlice',
    initialState: {
        status: null,
        error: null,
        oneCodeTest: null
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
    }
});

const codeTestReducers = codeTestSlice.reducer;

export default codeTestReducers;

