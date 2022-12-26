import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


import {
    AdminPage,
    CompilerPage,
    CreateTestPage,
    FeedbackFormPage,
    ForUserPage,
    GoogleRedirectPage,
    MainFirepadPage,
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
    HomeFirepadPage,
} from './pages';
import {Layout} from './components';
import {
    clear,
    clearCreateTest,
    getLanguage,
    getUserBadges,
    getUserResults,
    getUserResultsAll,
    getUserRoles,
    setJwtFromLocalStorage,
    setUserFromLocalStorage
} from './store';
import {getUserAchievement, setUserRank} from './store';
import {DonationPage} from './pages/DonationPage/DonationPage';
import {ref, remove} from 'firebase/database';
import {db} from './firebaseConfig';
import css from './pages/MainFirepadPage/MainFirepadPage.module.css';

function App() {
    const {user} = useSelector(state => state['userReducers']);

    const {isTestCompleted} = useSelector(state => state['resultReducers']);

    const {timeToClear} = useSelector(state => state['createTestsReducers']);

    const {userAchievement} = useSelector(state => state['achievementsReducers']);

    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const {EN} = useSelector(state => state['languageReducers']);

    let teamCoding = localStorage.getItem('teamCoding');

    let pathCoding = localStorage.getItem('pathCoding');

    let path = localStorage.getItem('path');

    const navigate = useNavigate();

    const [modal, setModal] = useState('');

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
            dispatch(getUserBadges(id));
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

    const changeLeaveOk = () => {
        setModal('');
        remove(ref(db, `/${path}`));
        localStorage.removeItem('teamCoding');
        localStorage.removeItem('pathCoding');
        navigate(`${pathname}`);
    }

    const changeLeaveCansel = () => {
        setModal('');
        navigate(`${pathCoding}`);
    }

    useEffect(() => {
        if (teamCoding && pathname != pathCoding) {
            setModal('leave');
            window.history.pushState(null, null, null);
        }
    }, [pathname]);

    return (
        <div>
            {modal === 'leave' && <div className={css.leave__main}>
                <div className={css.leave__modal_block}>
                    {EN ? 'Are you sure you want to leave the page?'
                        :
                        'Ви впевнені, що бажаєте покинути сторінку?'}

                    <p className={css.leave__modal_block_text}>
                        {EN ? 'This action will remove the code'
                            :
                            'Ця дія приведе до видалення коду'}
                    </p>

                    <div>
                        <button onClick={changeLeaveOk} className={css.modal__btn}>
                            {EN ? 'Ok' : 'Так'}
                        </button>

                        <button onClick={changeLeaveCansel} className={css.modal__btn}>
                            {EN ? 'Cansel' : 'Відмінити'}
                        </button>
                    </div>

                </div>
            </div>}

            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'/test-list/:techId'} element={<TestListPage/>}/>
                    <Route path={'/test/:testId'} element={<TestPage/>}/>
                    <Route path={'/registration'} element={<RegisterPage/>}/>
                    <Route path={'/user'} element={<UserPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/createTest'} element={<CreateTestPage/>}/> -
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
                    <Route path={'/team-coding'} element={<HomeFirepadPage/>}/>
                    <Route path="/team-coding/:template/:id" element={<MainFirepadPage/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
