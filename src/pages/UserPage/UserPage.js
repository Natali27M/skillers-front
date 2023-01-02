import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Navigate, useLocation} from 'react-router-dom';

import css from './UserPage.module.css';
import rootCSS from '../../styles/root.module.css';
import avatar from '../../images/avatar.jpg';
import arrow from '../../images/arrow.svg';
import Lamer from '../../images/rank_little/Lamer.png';
import Trainee from '../../images/rank_little/Trainee.png';
import Junior from '../../images/rank_little/Junior.png';
import Middle from '../../images/rank_little/Middle.png';
import Senior from '../../images/rank_little/Senior.png';
import hiringImg from '../../images/hiring.svg';

import {
    getCodeResultsForEvaluating, getCodeTestsByUser, getCodeTestsForApprove,
    getResultsByTest, getTestCodeResults,
    getUserCodeResults,
    getUserResults,
    getRecruiterByUserId,
    getUserRoles,
    logout,
    updateUser
} from '../../store';

import {getUserAchievement} from '../../store';
import {useForm} from 'react-hook-form';
import {getTestsByUser, getTestsForApprove} from '../../store/slices/testPage.slice';
import coin from '../../images/coin.svg';
import {RecruiterButton, UserBadges} from '../../components/ForUserPage';

const UserPage = () => {
    const {register, handleSubmit} = useForm();

    const {EN} = useSelector(state => state['languageReducers']);

    const {user, roles, updateError} = useSelector(state => state['userReducers']);

    const {userResults, resultsByTest} = useSelector(state => state['resultReducers']);

    const {userAchievement, userRank} = useSelector(state => state['achievementsReducers']);

    const {codeTestPageForApprove, codeTestsByUser} = useSelector(state => state['codeTestReducers']);

    const {testsForApprove, testsByUser} = useSelector(state => state['testsReducers']);

    const {
        userCodeResultPage,
        resultPageForEvaluate,
        resultsByCodeTest
    } = useSelector(state => state['codeResultsReducers']);

    const {pathname} = useLocation();

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);

    const [resultsPageNumber, setResultsPageNumber] = useState(1);

    const [codeResultsPageNumber, setCodeResultsPageNumber] = useState(1);

    const [usersCodeResultsPageNumber, setUsersCodeResultsPageNumber] = useState(1);

    const [resultsFooEvaluatePageNumber, setResultsFooEvaluatePageNumber] = useState(1);

    const [testsPageNumber, setTestsPageNumber] = useState(1);

    const [codeTestsPageNumber, setCodeTestsPageNumber] = useState(1);

    const {resultBadges} = useSelector(state => state['badgesReducers']);

    const [modal, setModal] = useState(false);

    const [hiring, setHiring] = useState(false);

    const [linkedOpen, setLinkedOpen] = useState(false);

    const [githubOpen, setGithubOpen] = useState(false);

    const [testForResults, setTestForResults] = useState(null);

    const [codeTestForResults, setCodeTestForResults] = useState(null);


    useEffect(() => {
        if (user) {
            const id = user?.id;
            dispatch(getUserAchievement(id));
            dispatch(getUserRoles(id));
            setHiring(user?.openForHiring);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getTestsByUser({pageNum: testsPageNumber, authorId: id}));
        }
    }, [user, testsPageNumber]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getCodeTestsByUser({pageNum: codeTestsPageNumber, authorId: id}));
        }
    }, [user, codeTestsPageNumber]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getUserResults({userId: id, pageNum: pageNumber}));
        }
    }, [user, pageNumber]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getUserCodeResults({userId: id, pageNum: codeResultsPageNumber}));
        }
    }, [user, codeResultsPageNumber]);

    useEffect(() => {
        if (user) {
            const id = user.id;
            dispatch(getCodeResultsForEvaluating({authorId: id, pageNum: resultsFooEvaluatePageNumber}));
        }
    }, [user, resultsFooEvaluatePageNumber]);

    useEffect(() => {
        if (testForResults) {
            dispatch(getResultsByTest({pageNum: resultsPageNumber, testId: testForResults?.id}));
        }
    }, [user, testForResults, resultsPageNumber]);
    useEffect(() => {
        if (codeTestForResults) {
            dispatch(getTestCodeResults({pageNum: usersCodeResultsPageNumber, testId: codeTestForResults?.id}));
        }
    }, [user, codeTestForResults, usersCodeResultsPageNumber]);

    useEffect(() => {
        dispatch(getTestsForApprove(1));
        dispatch(getCodeTestsForApprove(1));
    }, [pathname]);

    useEffect(() => {
        if (user) {
            dispatch(getRecruiterByUserId(user?.id));
        }
    }, [modal, user]);

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

    const updateUserFunction = (obj) => {
        dispatch(updateUser({data: {username: obj.user}, userId: user.id}));
    };

    const changeHiring = (hiringType) => {
        if (!!user?.openForHiring !== !!hiring) {
            dispatch(updateUser({data: {openForHiring: hiringType}, userId: user.id}));
        }
    };

    const changeLinked = (obj) => {
        dispatch(updateUser({data: {linkedin: obj.linkedin}, userId: user.id}));
        setLinkedOpen(false);
    };

    const changeGithub = (obj) => {
        dispatch(updateUser({data: {github: obj.github}, userId: user.id}));
        setGithubOpen(false);
    };

    if (modal) {
        setTimeout(() => setModal(!modal), 4000);
    }

    return (
        <div className={css.user__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.user__wrap}>
                <img src={avatar} className={css.user__avatar} alt={user.username}/>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Information' : 'Інформація'}
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Username' : 'Нікнейм'}</div>
                    <div className={css.user__db_content}>{user.username}</div>
                </div>
                <form className={css.update__username_form} onSubmit={handleSubmit(updateUserFunction)}>
                    <input
                        type="text"
                        placeholder={EN ? 'Change username' : 'Змінити нікнейм'}
                        {...register('user')}
                        autoComplete="off"
                        defaultValue={''}
                        className={css.update__username__input}
                    />
                    <button className={css.update__username__button}>{EN ? 'Save' : 'Зберегти'}</button>
                </form>
                {updateError &&
                    <div className={css.error}>
                        {EN ? 'Username change error. Perhaps a User with such a nickname already exists.'
                            :
                            'Помилка зміни юзернейму. Можливо Користувач з таким нікнеймом вже існує.'}
                    </div>
                }

                {user?.wallet && <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'MetaMask wallet' : 'MetaMask гаманець'}</div>
                    <div className={css.user__db_content}>
                        <div className={css.wallet}>{user.wallet}</div>
                    </div>
                </div>
                }
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Email' : 'Email'}</div>
                    <div className={css.user__db_content}>{user.email}</div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Rating' : 'Рейтинг'}</div>
                    <div className={css.user__db_content}>{userAchievement?.attributes?.rating || 0}</div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Coins' : 'Монетки'}</div>
                    <div className={css.user__db_content}>
                        <div>{userAchievement?.attributes?.coins || 0}</div>
                        <img src={coin} alt="coin" className={css.coin__img}/>
                    </div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Rank' : 'Звання'}</div>
                    <div className={css.user__db_content}>
                        <Link className={css.rank__wrap} to={'/rank'}>
                            <img
                                src={userRank === 'Lamer' ? Lamer : userRank === 'Trainee' ? Trainee
                                    :
                                    userRank === 'Junior' ? Junior : userRank === 'Middle' ? Middle : Senior}
                                alt="trainee"
                                className={css.user__rank_img}
                            />
                            <div>{userRank || '-'}</div>
                        </Link>
                    </div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>{EN ? 'Search job' : 'У пошуку роботи'}</div>
                    <div className={css.user__db_content}>
                        <div className={css.hiring__wrap}>
                            <div className={css.hiring__check} onClick={() => setHiring(!hiring)}>
                                {hiring && <img src={hiringImg} alt="hiring"/>}
                            </div>
                            <button
                                className={!!user?.openForHiring === !!hiring ? css.hiring__btn : css.hiring__btn_active}
                                onClick={() => changeHiring(hiring)}
                            >
                                {EN ? 'Change' : 'Змінити'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>Linkedin</div>
                    <div className={css.user__db_content}>
                        {
                            user?.linkedin ?
                                <div className={css.hiring__wrap}>
                                    <a href={user?.linkedin} target="_blank" className={css.linked__btn}>
                                        LinkedIn
                                    </a>
                                    <button
                                        className={css.hiring__btn_active}
                                        onClick={() => setLinkedOpen(!linkedOpen)}
                                    >
                                        {EN ? 'Change' : 'Змінити'}
                                    </button>
                                </div>
                                :
                                <button onClick={() => setLinkedOpen(!linkedOpen)}
                                        className={linkedOpen ? css.hiring__btn : css.hiring__btn_active}>
                                    {EN ? 'Add' : 'Додати'}
                                </button>
                        }
                    </div>
                </div>
                {linkedOpen && <form className={css.update__username_form} onSubmit={handleSubmit(changeLinked)}>
                    <input
                        type="text"
                        placeholder="Linkedin URL"
                        {...register('linkedin')}
                        autoComplete="off"
                        defaultValue={user?.linkedin}
                        className={css.update__username__input}
                    />
                    <button className={css.update__username__button}>{EN ? 'Save' : 'Зберегти'}</button>
                </form>}
                <div className={css.user__data_block}>
                    <div className={css.user__db_content}>Github</div>
                    <div className={css.user__db_content}>
                        {
                            user?.github ?
                                <div className={css.hiring__wrap}>
                                    <a href={user?.github} target="_blank" className={css.github__btn}>
                                        Github
                                    </a>
                                    <button
                                        className={css.hiring__btn_active}
                                        onClick={() => setGithubOpen(!githubOpen)}
                                    >
                                        {EN ? 'Change' : 'Змінити'}
                                    </button>
                                </div>
                                :
                                <button onClick={() => setGithubOpen(!githubOpen)}
                                        className={githubOpen ? css.hiring__btn : css.hiring__btn_active}>
                                    {EN ? 'Add' : 'Додати'}
                                </button>
                        }
                    </div>
                </div>
                {githubOpen && <form className={css.update__username_form} onSubmit={handleSubmit(changeGithub)}>
                    <input
                        type="text"
                        placeholder="GitHub URL"
                        {...register('github')}
                        autoComplete="off"
                        defaultValue={user?.github}
                        className={css.update__username__input}
                    />
                    <button className={css.update__username__button}>{EN ? 'Save' : 'Зберегти'}</button>
                </form>}
                {resultBadges && <>
                    <div className={rootCSS.default__title_24}>
                        {EN ? 'My badges' : 'Мої нагороди'}
                    </div>
                    <UserBadges/>
                </>}
                {!!userResults?.data?.length && <div className={css.results__wrap}>
                    <div className={rootCSS.default__title_24}>
                        {EN ? 'My results' : 'Мої результати'}
                    </div>
                    <div className={css.results__header}>
                        <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                        <div className={css.results__result}>{EN ? 'Result' : 'Результат'}</div>
                    </div>
                    {userResults?.data?.map(result =>
                        <Link to={`/test/${result.attributes.testId}`} key={result.id} className={css.results__block}>
                            <div className={css.result__testName}>{result.attributes.testName}</div>
                            <div
                                className={css.results__result}>{result.attributes.correctAnswer}/{result.attributes.allExercises}</div>
                        </Link>
                    )}
                    <div className={css.pagination__block}>
                        <img className={css.arrow__left} onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                             src={arrow} alt="arrow"/>
                        <div>{pageNumber}/{userResults.meta.pagination.pageCount}</div>
                        <img className={css.arrow__right} src={arrow}
                             onClick={() => pageNumber < userResults.meta?.pagination?.pageCount && setPageNumber(pageNumber + 1)}
                             alt="arrow"/>
                    </div>
                </div>}
                {!!userCodeResultPage?.data?.length &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? 'Results of practical tasks' : 'Результати практичних завдань '}
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                            <div className={css.results__result}>{EN ? 'Mark' : 'Оцінка'}</div>
                        </div>
                        {userCodeResultPage?.data?.map(result =>
                            <Link to={`/code-test/${result.attributes.codeTestId}`} key={result.id}
                                  className={css.results__block}>
                                <div className={css.result__testName}>{result.attributes.testName}</div>
                                <div
                                    className={css.results__result}>{result?.attributes?.authorMark || '-'}</div>
                            </Link>
                        )}
                        <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => codeResultsPageNumber > 1 && setCodeResultsPageNumber(codeResultsPageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{codeResultsPageNumber}/{userCodeResultPage.meta.pagination.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => pageNumber < userCodeResultPage.meta?.pagination?.pageCount && setCodeResultsPageNumber(codeResultsPageNumber + 1)}
                                 alt="arrow"/>
                        </div>

                    </div>
                }
                {!!resultPageForEvaluate?.data?.length &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? 'The results of your tests that need to be evaluated'
                                : 'Результати ваших тестів, які треба оцінити'}
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                            <div className={css.results__result}>{EN ? 'User' : 'Користувач'}</div>
                        </div>
                        {resultPageForEvaluate?.data?.map(result =>
                            <Link to={`/code-test/${result?.attributes?.codeTestId}-${result.id}`} key={result.id}
                                  className={css.results__block}>
                                <div className={css.result__testName}>{result.attributes.testName}</div>
                                <div
                                    className={css.results__result}>{result?.attributes?.userName}
                                </div>
                            </Link>
                        )}
                        <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => resultsFooEvaluatePageNumber > 1 && setResultsFooEvaluatePageNumber(resultsFooEvaluatePageNumber - 1)}
                                 src={arrow} alt="arrow"
                            />
                            <div>{resultsFooEvaluatePageNumber}/{resultPageForEvaluate.meta.pagination.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => pageNumber < resultPageForEvaluate.meta?.pagination?.pageCount && setResultsFooEvaluatePageNumber(resultsFooEvaluatePageNumber + 1)}
                                 alt="arrow"
                            />
                        </div>

                    </div>
                }
                {!!testsByUser?.data?.length &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? 'My tests' : 'Мої тести'}
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                            <div className={css.results__result}>{EN ? 'Tech ID' : 'ID технології'}</div>
                            <div className={css.fill}></div>
                        </div>
                        {testsByUser?.data?.map(test =>
                            <div key={test.id} className={css.results__block}>
                                <Link to={`/test/${test.id}`}
                                      className={css.result__testName}>{test.attributes.name}</Link>
                                <div className={css.results__result}>{test.attributes.techId}</div>
                                <button
                                    onClick={() => testForResults === test ? setTestForResults(null) : setTestForResults(test)}
                                    className={css.show__result_btn}>
                                    {EN ? 'Results' : 'Результати'}
                                </button>
                            </div>
                        )}
                        <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => testsPageNumber > 1 && setTestsPageNumber(testsPageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{testsPageNumber}/{testsByUser.meta.pagination.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => testsPageNumber < testsByUser.meta?.pagination?.pageCount && setTestsPageNumber(testsPageNumber + 1)}
                                 alt="arrow"/>
                        </div>
                    </div>
                }
                {testForResults &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? `Results of ${testForResults.attributes.name}`
                                : `Результати ${testForResults.attributes.name}`
                            }
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'User ID' : 'ID Користувача'}</div>
                            <div className={css.results__result}>{EN ? 'Result' : 'Результат'}</div>
                        </div>
                        {resultsByTest?.data?.map(result =>
                            <Link to={`/test/${result?.attributes?.testId}-${result?.attributes?.userId}`}
                                  key={result.id}
                                  className={css.results__block}>
                                <div className={css.result__testName}>{result?.attributes?.userId}</div>
                                <div
                                    className={css.results__result}>{result?.attributes?.correctAnswer}/{result?.attributes?.allExercises}</div>
                            </Link>
                        )}
                        {!!resultsByTest?.data?.length ? <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => resultsPageNumber > 1 && setResultsPageNumber(resultsPageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{resultsPageNumber}/{resultsByTest?.meta?.pagination?.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => resultsPageNumber < resultsByTest?.meta?.pagination?.pageCount && setTestsPageNumber(resultsPageNumber + 1)}
                                 alt="arrow"/>
                        </div> : <div>{EN ? 'No results' : 'Немає результатів'}</div>}
                    </div>
                }
                {!!codeTestsByUser?.data?.length &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? 'My code tests' : 'Мої практичні тести'}
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'Test' : 'Тест'}</div>
                            <div className={css.results__result}>{EN ? 'Tech ID' : 'ID технології'}</div>
                            <div className={css.fill}></div>
                        </div>
                        {codeTestsByUser?.data?.map(test =>
                            <div key={test.id} className={css.results__block}>
                                <Link to={`/code-test/${test.id}`}
                                      className={css.result__testName}>{test.attributes.testName}</Link>
                                <div className={css.results__result}>{test.attributes.techId}</div>
                                <button
                                    onClick={() => codeTestForResults === test ? setCodeTestForResults(null) : setCodeTestForResults(test)}
                                    className={css.show__result_btn}>
                                    {EN ? 'Results' : 'Результати'}
                                </button>
                            </div>
                        )}
                        <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => codeTestsPageNumber > 1 && setCodeTestsPageNumber(codeTestsPageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{codeTestsPageNumber}/{codeTestsByUser.meta.pagination.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => codeTestsPageNumber < codeTestsByUser.meta?.pagination?.pageCount && setCodeTestsPageNumber(codeTestsPageNumber + 1)}
                                 alt="arrow"/>
                        </div>
                    </div>
                }
                {codeTestForResults &&
                    <div className={css.results__wrap}>
                        <div className={rootCSS.default__title_24}>
                            {EN ? `Results of ${codeTestForResults.attributes.testName}`
                                : `Результати ${codeTestForResults.attributes.testName}`
                            }
                        </div>
                        <div className={css.results__header}>
                            <div className={css.result__testName}>{EN ? 'User ID' : 'ID Користувача'}</div>
                            <div className={css.results__result}>{EN ? 'Result' : 'Результат'}</div>
                        </div>
                        {resultsByCodeTest?.data?.map(result =>
                            <Link to={`/code-test/${result?.attributes?.codeTestId}-${result?.id}`}
                                  key={result.id}
                                  className={css.results__block}>
                                <div className={css.result__testName}>{result?.attributes?.userId}</div>
                                <div
                                    className={css.results__result}>{result?.attributes?.authorMark || '-'}
                                </div>
                            </Link>
                        )}
                        {!!resultsByCodeTest?.data?.length ? <div className={css.pagination__block}>
                            <img className={css.arrow__left}
                                 onClick={() => usersCodeResultsPageNumber > 1 && setUsersCodeResultsPageNumber(usersCodeResultsPageNumber - 1)}
                                 src={arrow} alt="arrow"/>
                            <div>{usersCodeResultsPageNumber}/{resultsByCodeTest?.meta?.pagination?.pageCount}</div>
                            <img className={css.arrow__right} src={arrow}
                                 onClick={() => usersCodeResultsPageNumber < resultsByCodeTest?.meta?.pagination?.pageCount && setUsersCodeResultsPageNumber(usersCodeResultsPageNumber + 1)}
                                 alt="arrow"/>
                        </div> : <div>{EN ? 'No results' : 'Немає результатів'}</div>}
                    </div>
                }
                <div className={css.buttons__wrap}>
                    <Link to={'/'} className={rootCSS.default__button}>{EN ? 'To main' : 'На головну'}</Link>

                    <Link to={'/mentor'}
                          className={rootCSS.default__button}>{EN ? 'Become a mentor' : 'Стати ментором'}</Link>

                    <RecruiterButton user={user} setModal={setModal} modal={modal}/>
                    {
                        modal && <div className={css.modal__container}>
                            <div className={css.modal__block}>
                                {EN ? "Your recruitment application has been processed!" : "Ваша заявка на рекрутинг оформлена!"}
                            </div>
                        </div>
                    }

                    <div className={rootCSS.default__button}
                         onClick={() => dispatch(logout())}>{EN ? 'Logout' : 'Вихід'}</div>
                    {roles?.includes('admin') &&
                        <>
                            <Link to={'/admin'} className={rootCSS.default__button}>
                                {EN ? 'Admin panel' : 'Адмін панель'}
                                {(!!testsForApprove?.data?.length || !!codeTestPageForApprove?.data?.length) &&
                                    <div className={css.approve__time}>!</div>}
                            </Link>
                            <Link to={'/recruiter'}
                                  className={rootCSS.default__button}>{EN ? 'For recruiters' : 'Рекрутерам'}
                            </Link>
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export {UserPage};
