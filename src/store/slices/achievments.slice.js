import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {achievementsServices} from '../../services';


export const getLeaderBord = createAsyncThunk(
    'achievementsSlice/getLeaderBord',
    async (pageNumber, {rejectWithValue}) => {
        try {
            return await achievementsServices.getLeaderBord(pageNumber);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getLeaderBordByQuery = createAsyncThunk(
    'achievementsSlice/getLeaderBord',
    async ({pageNumber, query}, {rejectWithValue}) => {
        try {
            return await achievementsServices.getLeaderBordByQuery(pageNumber, query);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const getUserAchievement = createAsyncThunk(
    'achievementsSlice/getUserAchievement',
    async (userId, {rejectWithValue}) => {
        try {
            return await achievementsServices.searchUserAchievement(userId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


export const updateUserAchievement = createAsyncThunk(
    'achievementsSlice/updateUserAchievement',
    async ({achId, data}, {rejectWithValue}) => {
        try {
            return await achievementsServices.updateAchievement(achId, data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

export const createUserAchievement = createAsyncThunk(
    'achievementsSlice/createUserAchievement',
    async (data, {rejectWithValue}) => {
        try {
            return await achievementsServices.createAchievement(data);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);


const achievementsSlice = createSlice({
    name: 'achievementsSlice',
    initialState: {
        status: null,
        error: null,
        userRank: null,
        leaderBord: [],
        userAchievement: null
    },
    reducers: {
        setUserRank: (state) => {
            const rating = state?.userAchievement?.attributes?.rating;

            if(!rating) {
                state.userRank = 'Lamer';
            }

            if (rating < 20) {
                state.userRank = 'Lamer';
            } else if (rating >= 20 && rating < 50) {
                state.userRank = 'Trainee';
            } else if (rating >= 50 && rating < 100) {
                state.userRank = 'Junior';
            } else if (rating >= 100 && rating < 200) {
                state.userRank = 'Middle';
            } else if (rating >= 200) {
                state.userRank = 'Senior';
            }
        }
    },
    extraReducers: {
        [getLeaderBord.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.leaderBord = action.payload;
        },

        [getLeaderBord.pending]: (state) => {
            state.status = 'pending';
        },

        [getLeaderBord.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getLeaderBordByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.leaderBord = action.payload;
        },

        [getLeaderBordByQuery.pending]: (state) => {
            state.status = 'pending';
        },

        [getLeaderBordByQuery.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUserAchievement.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userAchievement = action.payload;
        },

        [getUserAchievement.pending]: (state) => {
            state.status = 'pending';
        },

        [getUserAchievement.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [updateUserAchievement.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userAchievement = action.payload;
        },

        [updateUserAchievement.pending]: (state) => {
            state.status = 'pending';
        },

        [updateUserAchievement.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [createUserAchievement.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.userAchievement = action.payload;
        },

        [createUserAchievement.pending]: (state) => {
            state.status = 'pending';
        },

        [createUserAchievement.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    },
});


export const {setUserRank} = achievementsSlice.actions;

const achievementsReducers = achievementsSlice.reducer;


export default achievementsReducers;