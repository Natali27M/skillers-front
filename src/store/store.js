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
import recruiterReducers from "./slices/recruiter.slice";
import paymentRequestReducers from "./slices/paymentRequest.slice";
import postReducers from './slices/post.slice';
import commentReducers from './slices/comment.slice';
import notificationReducers from './slices/notification.slice';
import questionsReducers from "./slices/question.slice";
import answersReducers from "./slices/answers.slice";
import categoriesReducers from "./slices/categories.slice";
import ideasReducers from "./slices/ideas.slice";
import discussionReducers from "./slices/discussion.slice";


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
        codeResultsReducers,
        recruiterReducers,
        paymentRequestReducers,
        postReducers,
        commentReducers,
        notificationReducers,
        questionsReducers,
        answersReducers,
        categoriesReducers,
        ideasReducers,
        discussionReducers,
    }
});

export default store;
