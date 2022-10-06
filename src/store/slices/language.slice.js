import {createSlice} from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'languageSlice',
    initialState: {
        EN: true
    },
    reducers: {
        getLanguage: (state) => {
            const language = JSON.parse(localStorage.getItem('language'));
            if (language !== null) {
                state.EN = language;
            } else {
                localStorage.setItem('language', true);
            }

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