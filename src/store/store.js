import {configureStore} from '@reduxjs/toolkit';

import languageReducers from './slices/language.slice';
import testsReducers from './slices/testPage.slice';
import exercisesReducers from './slices/exercises.slice';
import userReducers from './slices/user.slice';
import achievementsReducers from './slices/achievments.slice';
import resultReducers from './slices/results.slice';
import createTestsReducers from './slices/createTest.slice';
import feedbackReducers from './slices/feedback.slice';
import mentorReducers from './slices/mentors.slice';
import technologiesReducers from './slices/technologies.slice';
import badgesReducers from './slices/badges.slice';
import codeTestReducers from './slices/codeTest.slice';
import codeResultsReducers from './slices/codeResults.slice';


const store = configureStore({
    reducer: {
        languageReducers,
        testsReducers,
        badgesReducers,
        exercisesReducers,
        userReducers,
        achievementsReducers,
        resultReducers,
        createTestsReducers,
        feedbackReducers,
        mentorReducers,
        technologiesReducers,
        codeTestReducers,
        codeResultsReducers
    }
});

export default store;