import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {vacancyServices} from '../../services';

export const createVacancy = createAsyncThunk(
    'vacancySlice/createVacancy',
    async (data, {rejectWithValue}) => {
        try {
            return await vacancyServices.createVacancy(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getVacanciesPaginated = createAsyncThunk(
    'vacancySlice/getVacanciesPaginated',
    async (pageNumber, {rejectWithValue}) => {
        try {
            return await vacancyServices.getVacancyPaginated(pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const vacancySlice = createSlice({
    name: 'vacancySlice',
    initialState: {
        status: null,
        error: null,
        vacancy: null,
        vacanciesPage: null
    },
    extraReducers: {
        [createVacancy.fulfilled]: (state, action) => {
            state.vacancy = action.payload;
            state.status = 'fulfilled';
        },
        [createVacancy.pending]: (state) => {
            state.status = 'pending';
        },
        [createVacancy.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },


        [getVacanciesPaginated.fulfilled]: (state, action) => {
            state.vacanciesPage = action.payload;
            state.status = 'fulfilled';
        },
        [getVacanciesPaginated.pending]: (state) => {
            state.status = 'pending';
        },
        [getVacanciesPaginated.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

const vacancyReducers = vacancySlice.reducer;

export default vacancyReducers;
