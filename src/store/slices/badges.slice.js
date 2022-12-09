import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {badgesServices} from '../../services';

export const getUserBadges = createAsyncThunk(
    'badgesSlice/getUserBadges',
    async (userId, {rejectWithValue}) => {
        try {
            return await badgesServices.getUserBadges(userId);
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const badgesSlice = createSlice({
    name: 'badgesSlice',
    initialState: {
        userBadges: null
    },
    reducers: {},
    extraReducers: {
        [getUserBadges.fulfilled]: (state, action) => {
            state.status = 'fulfilled';

            const badges = action.payload.data[action.payload.data?.length - 1];

            state.userBadges = badges;

            let endBadgesArray = [];

            for (const badge in badges.attributes.badgesArray) {
                // console.log(badge);
            }


        }
    }
});

const badgesReducers = badgesSlice.reducer;

export default badgesReducers;