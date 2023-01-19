import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ref, remove} from 'firebase/database';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import {
    AdminPage,
    CompilerPage,
    CreateCodeTestPage,
    CreateTestPage,
    FeedbackFormPage,
    ForUserPage,
    GoogleRedirectPage,
    HomeFirepadPage,
    HomePage,
    LearningPlanPage,
    LoginPage,
    MainFirepadPage,
    MentorPage,
    MentorsPage,
    NotFoundPage,
    PolicyPage,
    RankPage,
    RecruiterPage,
    RegisterPage,
    SklPage,
    TestListPage,
    TestPage,
    TestWithCodePage,
    UserPage, VacanciesPage
} from './pages';
import {Layout} from './components';
import {
    clear,
    clearCreateTest,
    getLanguage,
    getUserAchievement,
    getUserBadges,
    getUserResults,
    getUserResultsAll,
    getUserRoles,
    setJwtFromLocalStorage,
    setUserFromLocalStorage,
    setUserRank
} from './store';
import {DonationPage} from './pages/DonationPage/DonationPage';
import {db} from './firebaseConfig';
import css from './pages/MainFirepadPage/MainFirepadPage.module.css';
import rootCSS from './styles/root.module.css';

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

    const [code, setCode] = useState('');

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
        setCode('');
        remove(ref(db, `/${path}`)).then(r => r);
        localStorage.removeItem('teamCoding');
        localStorage.removeItem('pathCoding');
        localStorage.removeItem('path');
        navigate(`${pathname}`);
    };

    const changeLeaveCansel = () => {
        setModal('');
        navigate(`${pathCoding}`);
    };

    useEffect(() => {
        if (teamCoding && pathname !== pathCoding) {
            setModal('leave');
        }

        if (teamCoding && pathname === '/team-coding') {
            setModal('leave');
        }
    }, [pathname]);

    const title = 'SKILLIANT - we help engineers to grow in IT';
    const description = 'Skilliant is a free online quiz platform that allows you to practice your skills and learn new ones';
    const url = 'https://skilliant.net';

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="description" content={description}/>
                    <meta property="og:url" content={url}/>
                    <meta property="og:title" content={title}/>
                    <meta property="og:description" content={description}/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:site_name" content="skilliant.net"/>
                    <title>{title}</title>
                    <link rel="canonical" href={url}/>
                </Helmet>

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

                        <div className={css.modal__box_btn}>
                            <button onClick={changeLeaveOk} className={rootCSS.default__button}>
                                {EN ? 'Ok' : 'Так'}
                            </button>

                            <button onClick={changeLeaveCansel} className={rootCSS.default__button}>
                                {EN ? 'Cancel' : 'Відмінити'}
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
                        <Route path={'/code-test/:id'} element={<TestWithCodePage/>}/>
                        <Route path={'/create-code-test'} element={<CreateCodeTestPage/>}/>
                        <Route path={'/feedback'} element={<FeedbackFormPage/>}/>
                        <Route path={'/mentor'} element={<MentorPage/>}/>
                        <Route path={'/mentors'} element={<MentorsPage/>}/>
                        <Route path={'/team-coding'} element={<HomeFirepadPage/>}/>
                        <Route path={'/learning-plan'} element={<LearningPlanPage/>}/>
                        <Route path={'/team-coding/:template/:id/:language/:idFirebase'} element={<MainFirepadPage/>}/>
                        <Route path={'/skl-token'} element={<SklPage/>}/>
                        <Route path={'/vacancies'} element={<VacanciesPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </div>
        </HelmetProvider>
    );
}

export default App;
