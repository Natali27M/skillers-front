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
    async ({query, pageNumber}, {rejectWithValue}) => {
        try {
            return await vacancyServices.getVacancyPaginated(query, pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getOneVacancy = createAsyncThunk(
    'vacancySlice/getOneVacancy',
    async (id, {rejectWithValue}) => {
        try {
            return await vacancyServices.getOneVacancy(id);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getVacanciesByEmployer = createAsyncThunk(
    'vacancySlice/getVacanciesByEmployer',
    async ({employerId, pageNum}, {rejectWithValue}) => {
        try {
            return await vacancyServices.getVacanciesPageByEmployer(employerId, pageNum);
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
        vacanciesPage: null,
        vacanciesByEmployerPage: null
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
        },


        [getOneVacancy.fulfilled]: (state, action) => {
            state.vacancy = action.payload;
            state.status = 'fulfilled';
        },
        [getOneVacancy.pending]: (state) => {
            state.status = 'pending';
        },
        [getOneVacancy.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },


        [getVacanciesByEmployer.fulfilled]: (state, action) => {
            state.vacanciesByEmployerPage = action.payload;
            state.status = 'fulfilled';
        },
        [getVacanciesByEmployer.pending]: (state) => {
            state.status = 'pending';
        },
        [getVacanciesByEmployer.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

const vacancyReducers = vacancySlice.reducer;

export default vacancyReducers;
