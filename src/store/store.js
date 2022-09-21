import {
    configureStore
} from '@reduxjs/toolkit';
import languageReducers from './slices/language.slice';
import testsReducers from './slices/testPage.slice';
import exercisesReducers from './slices/exercises.slice';
import userReducers from './slices/user.slice';
import achievementsReducers from './slices/achievments.slice';
import resultReducers from './slices/results.slice';
import createTestsReducers from './slices/createTest.slice';


const store = configureStore({
    reducer: {
        languageReducers,
        testsReducers,
        exercisesReducers,
        userReducers,
        achievementsReducers,
        resultReducers,
        createTestsReducers
    }
});

export default store;