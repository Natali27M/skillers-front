import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
    AdminPage,
    CreateTestPage,
    GoogleRedirectPage,
    HomePage,
    LoginPage,
    RegisterPage,
    TestListPage,
    TestPage,
    UserPage
} from './pages';
import {Layout} from './components';
import {
    clear,
    clearCreateTest,
    getLanguage, getUserResultsAll,
    getUserRoles,
    setJwtFromLocalStorage,
    setUserFromLocalStorage
} from './store';
import {getUserAchievement} from './store/slices/achievments.slice';
import {getUserResults} from './store';


function App() {
    const {user, jwt} = useSelector(state => state['userReducers']);

    const {isTestCompleted} = useSelector(state => state['resultReducers']);

    const {timeToClear} = useSelector(state => state['createTestsReducers']);

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

        }
    }, [user]);

    useEffect(() => {
        if (user) {
            dispatch(getUserResultsAll(user.id));
        }
    }, [user, isTestCompleted]);

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
                <Route path={'/forgot-password'} element={<AdminPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
