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
        userBadges: null,
        resultBadges: null
    },
    reducers: {},
    extraReducers: {
        [getUserBadges.fulfilled]: (state, action) => {
            state.status = 'fulfilled';

            const badges = action.payload.data[action.payload.data?.length - 1];

            const startBadgesObj = {...badges?.attributes?.badgesArray};

            state.userBadges = badges;

            let result = [];

            for (const badge in startBadgesObj) {
                if (+startBadgesObj[badge] < 5) {
                    continue;
                }
                const resultCount = +startBadgesObj[badge];

                let starCount = 0;

                if (resultCount < 10) {
                    starCount = 1;
                } else if (resultCount < 20) {
                    starCount = 2;
                } else if (resultCount < 40) {
                    starCount = 3;
                } else if (resultCount < 60) {
                    starCount = 4;
                } else {
                    starCount = 5;
                }

                result.push({techId: +badge, count: starCount});
            }

            state.resultBadges = result;
        }
    }
});

const badgesReducers = badgesSlice.reducer;

export default badgesReducers;
