import {createSlice} from '@reduxjs/toolkit';

const loadSlice = createSlice({
    name: 'loadSlice',
    initialState: {
        techBlock: false
    },
    reducers: {
        changeState: (state, action) => {
            const {stateName, bool} = action.payload;
            state[stateName] = bool;
        }
    }
});

const loadReducers = loadSlice.reducer;

export const {changeState} = loadSlice.actions;

export default loadReducers;
