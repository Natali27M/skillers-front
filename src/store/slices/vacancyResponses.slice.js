import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {vacancyResponsesServices, vacancyServices} from '../../services';

export const createVacancyResponse = createAsyncThunk(
    'vacancyResponsesSlice/createVacancyResponse',
    async (data, {rejectWithValue}) => {
        try {
            const vacancy = await vacancyServices.getOneVacancy(data?.vacancyId);
            const response = await vacancyResponsesServices.createResponse(data);
            await vacancyServices.updateVacancy(data?.vacancyId,
                {reviews: vacancy?.attributes?.reviews ? vacancy?.attributes?.reviews + 1 : 1}
            );
            return response;
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getResponseOfUserByVacancy = createAsyncThunk(
    'vacancyResponsesSlice/getResponseOfUserByVacancy',
    async ({userId, vacancyId}, {rejectWithValue}) => {
        try {
            return await vacancyResponsesServices.getUserByVacancyResponse(userId, vacancyId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getResponsesByVacancy = createAsyncThunk(
    'vacancyResponsesSlice/getResponsesByVacancy',
    async ({pageNumber, vacancyId}, {rejectWithValue}) => {
        try {
            return await vacancyResponsesServices.getResponsesByVacancyPaginated(vacancyId, pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const vacancyResponsesSlice = createSlice({
    name: 'vacancyResponsesSlice',
    initialState: {
        status: null,
        error: null,
        userResponse: null,
        responsesPage: null
    },
    extraReducers: {
        [createVacancyResponse.fulfilled]: (state, action) => {
            state.userResponse = action.payload;
            state.status = 'fulfilled';
        },
        [createVacancyResponse.pending]: (state) => {
            state.status = 'pending';
        },
        [createVacancyResponse.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getResponseOfUserByVacancy.fulfilled]: (state, action) => {
            state.userResponse = action.payload;
            state.status = 'fulfilled';
        },
        [getResponseOfUserByVacancy.pending]: (state) => {
            state.status = 'pending';
        },
        [getResponseOfUserByVacancy.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },


        [getResponsesByVacancy.fulfilled]: (state, action) => {
            state.responsesPage = action.payload;
            state.status = 'fulfilled';
        },
        [getResponsesByVacancy.pending]: (state) => {
            state.status = 'pending';
        },
        [getResponsesByVacancy.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },


    }
});

const vacancyResponseReducers = vacancyResponsesSlice.reducer;

export default vacancyResponseReducers;
