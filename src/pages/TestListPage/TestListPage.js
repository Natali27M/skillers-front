import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Helmet} from 'react-helmet-async';

import css from './TestListPage.module.css';
import headerCss from '../../components/GeneralComponents/Header/Header.module.css';
import {getTechnology, getTests, getTestsByQuery} from '../../store/slices/testPage.slice';
import {BackButton, TestBlock} from '../../components';
import sortAsc from '../../images/sort-asc.svg';
import sortDesc from '../../images/sotr-desc.svg';
import dropArrow from '../../images/dropArrow.svg';
import new_icon from '../../images/new_icon.svg';
import arrowSide from '../../images/arrow.svg';
import arrowSideGrey from '../../images/arrow-grey.svg';
import doubleArrowSide from '../../images/dobleArrow.svg';
import DoubleArrowSideGrey from '../../images/dobleArrow-grey.svg';
import useComponentVisible from '../../RootFunctions/useComponentVisible';
import useWindowDimensions from '../../RootFunctions/WindowDimensions';
import pagination from '../../RootFunctions/pagination';
import {getCodeTestsPaginated, getUserResultByTechnology} from '../../store';


const TestListPage = () => {
    const {techId} = useParams();

    const {user} = useSelector(state => state['userReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const {tests, technology} = useSelector(state => state['testsReducers']);

    const {codeTestPage} = useSelector(state => state['codeTestReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    const {width} = useWindowDimensions();

    const dispatch = useDispatch();

    const [currenPage, setCurrentPage] = useState(1);

    const [sortParams, setSortParams] = useState('avgMark');

    const [dropOpen, setDropOpen] = useState(false);

    const [isDesc, setIsDesc] = useState(true);

    const [isCodeTest, setIsCodeTest] = useState(false);

    const [testLng, setTestLng] = useState(true);

    const codeSetter = (value) => {
        if (value !== isCodeTest) {
            setIsCodeTest(value);
            setCurrentPage(1);
        }
    };

    const paramsSetter = (value) => {
        if (sortParams !== value) {
            setSortParams(value);
        }
        setDropOpen(false);
    };

    useEffect(() => {
        if (user) {
            dispatch(getUserResultByTechnology({userId: user?.id, techId}));
        }
    }, [user, techId]);

    useEffect(() => {
        dispatch(getTechnology({techId}));
    }, [currenPage]);

    useEffect(() => {
        if (isCodeTest) {
            dispatch(getCodeTestsPaginated({
                techId,
                pageNum: currenPage,
                sortParams,
                order: isDesc ? 'desc' : 'asc',
                ukr: !testLng
            }));
        } else {
            dispatch(getTests({
                techId,
                pageNum: currenPage,
                sortParams,
                order: isDesc ? 'desc' : 'asc',
                ukr: !testLng
            }));
        }
    }, [currenPage, sortParams, isDesc, isCodeTest, testLng]);

    useEffect(() => {
        if (!isComponentVisible) {
            setDropOpen(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        setDropOpen(false);
    }, [width]);

    const allPages = isCodeTest ? codeTestPage?.meta?.pagination?.pageCount : tests?.meta?.pagination?.pageCount;

    const pagesArray = pagination(allPages, currenPage);

    const handleChange = (e) => {
        const data = e.target.value;
        setCurrentPage(1);
        data === '' ?
            dispatch(getTests({techId, pageNum: currenPage}))
            :
            dispatch(getTestsByQuery({query: data, pageNum: currenPage}));
    };

    const title = `${technology} tests`;
    const description = `All ${technology} tests and practical, search and sort this tests, difficult, rating and monetization`;
    const url = `https://skilliant.net/test-list/${techId}`;

    return (
        <div className={css.test__page}>
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

            <h2 className={css.test__page_title}>{EN ? `${technology} tests` : `Тести з ${technology}`}</h2>
            <div className={css.test__page_backAndLang}>
                <BackButton/>
                <div className={css.test__page_language}>
                    <div>{EN ? 'Test language:' : 'Мова тесту:'}</div>
                    <button onClick={() => setTestLng(!testLng)}
                            className={testLng ? headerCss.switch_btn_en : headerCss.switch_btn_uk}>
                        <div className={testLng ? headerCss.switch_btn_ball_en : headerCss.switch_btn_ball_uk}>
                        </div>
                        <div
                            className={testLng ? headerCss.switch_btn_name_en : headerCss.switch_btn_name_uk}>
                            {testLng ? 'EN' : 'UK'}
                        </div>
                    </button>
                </div>
            </div>

            <div className={css.search__form_wrap}>
                <form className={css.search__form}>
                    <input
                        type="text"
                        className={css.search__input}
                        placeholder={EN ? 'Search...' : 'Пошук...'}
                        onChange={e => handleChange(e)}
                    />
                </form>
            </div>
            <div className={css.sorting__wrap_main}>
                {+techId !== 8 && +techId !== 9 && +techId !== 10 && <div className={css.test__switcher_wrap}>
                    <div className={css.test__switcher}>
                        <div onClick={() => codeSetter(true)}
                             className={`${css.test__switcher_btn} ${isCodeTest ? css.chosen : ''}`}>
                            {EN ? 'Practical' : 'Практичні'}
                        </div>
                        <div onClick={() => codeSetter(false)}
                             className={`${css.test__switcher_btn} ${!isCodeTest ? css.chosen : ''}`}>
                            {EN ? 'Test' : 'Тестові'}
                        </div>
                        <img src={new_icon} alt="new" className={css.new__icon}/>
                    </div>
                </div>}
                <div className={css.sorting__wrap}>
                    <div className={css.sorting__wrap}>
                        <div>{EN ? 'Sort by:' : 'Сортувати за:'}</div>
                        <div className={css.sorting__dropdown_wrap} ref={ref}>
                            <div className={css.sorting__dropdown_btn} onClick={() => setDropOpen(!dropOpen)}>
                                <div>
                                    {sortParams === 'name' ?
                                        (EN ? 'Name' : 'Ім\'ям') : sortParams === 'createdAt' ?
                                            (EN ? 'Date' : 'Датою додання') : sortParams === 'difficult' ?
                                                (EN ? 'Difficult' : 'Складністю') : (EN ? 'Rating' : 'Рейтингом')
                                    }
                                < /div>
                                <img
                                    className={dropOpen ?
                                        css.drop__arrow_open
                                        :
                                        css.drop__arrow_close}
                                    src={dropArrow} alt="arrow"
                                />
                            </div>
                            <div className={dropOpen ? css.dropdown__menu : css.dropdown__menu_close}>
                                {sortParams !== 'avgMark' &&
                                    <div className={css.dropdown__element} onClick={() => paramsSetter('avgMark')}>
                                        {EN ? 'Rating' : 'Рейтингом'}
                                    </div>
                                }
                                {sortParams !== 'name' &&
                                    <div className={css.dropdown__element} onClick={() => paramsSetter('name')}>
                                        {EN ? 'Name' : 'Ім\'ям'}
                                    </div>
                                }
                                {sortParams !== 'createdAt' &&
                                    <div className={css.dropdown__element} onClick={() => paramsSetter('createdAt')}>
                                        {EN ? 'Date' : 'Датою додання'}
                                    </div>
                                }
                                {sortParams !== 'difficult' &&
                                    <div className={css.dropdown__element} onClick={() => paramsSetter('difficult')}>
                                        {EN ? 'Difficult' : 'Складністю'}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setIsDesc(!isDesc)} className={css.order__btn}>
                        <img src={isDesc ? sortDesc : sortAsc} alt="order"/>
                    </div>
                </div>
            </div>


            {!isCodeTest && !!tests?.data?.length &&
                <div className={css.tests__wrap}>
                    {!!tests?.data?.length && tests?.data?.map(test => <TestBlock key={test.id} test={test}/>)}
                </div>
            }

            {isCodeTest && !!codeTestPage?.data?.length &&
                <div className={css.tests__wrap}>
                    {!!codeTestPage?.data?.length && codeTestPage?.data?.map(test =>
                        <TestBlock type={'code'}
                                   key={test.id}
                                   test={test}/>)}
                </div>
            }
            <div className={css.pagination__wrap}>
                <div className={css.pagination__container}>
                    {allPages > 4 &&
                        <img className={css.arrow__left} src={currenPage === 1 ? DoubleArrowSideGrey : doubleArrowSide}
                             alt="arrow"
                             onClick={() => currenPage !== 1 && setCurrentPage(1)}/>}

                    <img className={css.arrow__left} src={currenPage === 1 ? arrowSideGrey : arrowSide} alt="arrow"
                         onClick={() => currenPage > 1 && setCurrentPage(currenPage - 1)}/>

                    {pagesArray?.map(page =>
                        <div onClick={() => page !== currenPage && setCurrentPage(page)}
                             className={currenPage === page ? css.pagination__number_active : css.pagination__number}
                             key={page}>
                            {page}
                        </div>
                    )}

                    <img className={css.arrow__right} src={currenPage === allPages ? arrowSideGrey : arrowSide}
                         alt="arrow"
                         onClick={() => currenPage < allPages && setCurrentPage(currenPage + 1)}/>
                    {allPages > 4 && <img className={css.arrow__right}
                                          src={currenPage === allPages ? DoubleArrowSideGrey : doubleArrowSide}
                                          alt="arrow"
                                          onClick={() => currenPage !== allPages && setCurrentPage(allPages)}/>}
                </div>
            </div>

        </div>
    );
};

export {TestListPage};
