import {createSlice} from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: {
        EN: true
    },
    reducers: {
        getLanguage: (state) => {
            state.EN = JSON.parse(localStorage.getItem('language'));
        },

        switchLanguage: (state) => {
            const currentLanguage = !state.EN;
            state.EN = currentLanguage;
            localStorage.setItem('language', currentLanguage);
        }
    }
});

const languageReducers = languageSlice.reducer;

export const {switchLanguage, getLanguage} = languageSlice.actions;

export default languageReducers;