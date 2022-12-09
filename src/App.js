import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


import {
    AdminPage,
    CompilerPage,
    CreateTestPage,
    FeedbackFormPage,
    ForUserPage,
    GoogleRedirectPage,
    HomePage,
    LoginPage,
    MentorPage,
    MentorsPage,
    NotFoundPage,
    PolicyPage,
    RankPage,
    RecruiterPage,
    RegisterPage,
    TestListPage,
    TestPage,
    UserPage,
} from './pages';
import {Layout} from './components';
import {
    clear,
    clearCreateTest,
    getLanguage,
    getUserResults,
    getUserResultsAll,
    getUserRoles,
    setJwtFromLocalStorage,
    setUserFromLocalStorage
} from './store';
import {getUserAchievement, setUserRank} from './store/slices/achievments.slice';
import {DonationPage} from './pages/DonationPage/DonationPage';
import {getUserBadges} from './store/slices/badges.slice';


function App() {
    const {user} = useSelector(state => state['userReducers']);

    const {isTestCompleted} = useSelector(state => state['resultReducers']);

    const {timeToClear} = useSelector(state => state['createTestsReducers']);

    const {userAchievement} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    useEffect(() => {
        dispatch(clear());
        dispatch(clearCreateTest());
    }, [pathname, timeToClear]);


    useEffect(() => {
        dispatch(getLanguage());
        dispatch(setUserFromLocalStorage());
        dispatch(setJwtFromLocalStorage());

    }, []);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getUserAchievement(id));
            dispatch(getUserResults({userId: id, pageNum: 1}));
            dispatch(getUserRoles(id));
            dispatch(getUserBadges(id))
        }
    }, [user]);

    useEffect(() => {

        dispatch(setUserRank());

    }, [userAchievement]);


    useEffect(() => {
        if (user && pathname.includes('test-list')) {
            dispatch(getUserResultsAll(user.id));
        }
    }, [user, isTestCompleted, pathname]);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'/test-list/:techId'} element={<TestListPage/>}/>
                <Route path={'/test/:testId'} element={<TestPage/>}/>
                <Route path={'/registration'} element={<RegisterPage/>}/>
                <Route path={'/user'} element={<UserPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/createTest'} element={<CreateTestPage/>}/>
                <Route path={'/google-auth'} element={<GoogleRedirectPage/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
                <Route path={'/policy'} element={<PolicyPage/>}/>
                <Route path={'/rank'} element={<RankPage/>}/>
                <Route path={'/forgot-password'} element={<AdminPage/>}/>
                <Route path={'/for-users'} element={<ForUserPage/>}/>
                <Route path={'/donation'} element={<DonationPage/>}/>
                <Route path={'/compiler'} element={<CompilerPage/>}/>
                <Route path={'/recruiter'} element={<RecruiterPage/>}/>
                {/*<Route path={'/feedback'} element={<FeedbackFormPage/>}/>*/}
                <Route path={'/feedback'} element={<FeedbackFormPage/>}/>
                <Route path={'/mentor'} element={<MentorPage/>}/>
                <Route path={'/mentors'} element={<MentorsPage/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
