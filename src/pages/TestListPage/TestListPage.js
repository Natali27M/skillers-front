import React, {useEffect, useState} from 'react';
import css from './TestListPage.module.css';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTechnology, getTests, getTestsByQuery} from '../../store/slices/testPage.slice';
import {BackButton, CodeTestBlock, TestBlock} from '../../components';

import sortAsc from '../../images/sort-asc.svg';
import sortDesc from '../../images/sotr-desc.svg';
import dropArrow from '../../images/dropArrow.svg';
import arrowSide from '../../images/arrow.svg';
import arrowSideGrey from '../../images/arrow-grey.svg';
import doubleArrowSide from '../../images/dobleArrow.svg';
import DoubleArrowSideGrey from '../../images/dobleArrow-grey.svg';
import useComponentVisible from '../../RootFunctions/useComponentVisible';
import useWindowDimensions from '../../RootFunctions/WindowDimensions';
import pagination from '../../RootFunctions/pagination';
import {getCodeTestsPaginated} from '../../store';


const TestListPage = () => {
    const {techId} = useParams();

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
        dispatch(getTechnology({techId}));
    }, [currenPage]);

    useEffect(() => {
        if (isCodeTest) {
            dispatch(getCodeTestsPaginated({techId, pageNum: currenPage, sortParams, order: isDesc ? 'desc' : 'asc'}));
        } else {
            dispatch(getTests({techId, pageNum: currenPage, sortParams, order: isDesc ? 'desc' : 'asc'}));
        }
    }, [currenPage, sortParams, isDesc, isCodeTest]);

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

    return (
        <div className={css.test__page}>
            <div className={css.test__page_title}>{EN ? `${technology} tests` : `Тести з ${technology}`}</div>

            <div className={css.search__form_wrap}>
                <BackButton/>
                <form className={css.search__form}>
                    <input
                        type="text"
                        className={css.search__input}
                        placeholder={EN ? 'Search...' : 'Пошук...'}
                        onChange={e => handleChange(e)}
                    />
                </form>
            </div>
            <div className={css.test__switcher_wrap}>
                <div className={css.test__switcher}>
                    <div onClick={() => codeSetter(true)}
                         className={`${css.test__switcher_btn} ${isCodeTest ? css.chosen : ''}`}>
                        {EN ? 'Practical' : 'Практичні'}
                    </div>
                    <div onClick={() => codeSetter(false)}
                         className={`${css.test__switcher_btn} ${!isCodeTest ? css.chosen : ''}`}>
                        {EN ? 'Test' : 'Тестові'}
                    </div>
                </div>
            </div>
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
                <div onClick={() => setIsDesc(!isDesc)} className={css.order__btn}>
                    <img src={isDesc ? sortDesc : sortAsc} alt="order"/>
                </div>
            </div>
            {!isCodeTest && !!tests?.data?.length &&
                <div className={css.tests__wrap}>
                    {!!tests?.data?.length && tests?.data?.map(test => <TestBlock key={test.id} test={test}/>)}
                </div>
            }
            {isCodeTest && !!codeTestPage?.data?.length &&
                <div className={css.tests__wrap}>
                    {!!codeTestPage?.data?.length && codeTestPage?.data?.map(test => <TestBlock type={'code'}
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
