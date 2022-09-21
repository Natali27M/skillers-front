import React, {useEffect, useState} from 'react';
import css from './TestListPage.module.css';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getTechnology, getTests, getTestsByQuery} from '../../store/slices/testPage.slice';
import {TestBlock} from '../../components';
import arrowSide from '../../images/arrow.svg';
import arrowSideGrey from '../../images/arrow-grey.svg';
import doubleArrowSide from '../../images/dobleArrow.svg';
import DoubleArrowSideGrey from '../../images/dobleArrow-grey.svg';


const TestListPage = () => {
    const {techId} = useParams();
    const {EN} = useSelector(state => state['languageReducers']);
    const {tests, technology} = useSelector(state => state['testsReducers']);

    const dispatch = useDispatch();

    const [currenPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getTests({techId, pageNum: currenPage}));
        dispatch(getTechnology({techId}));
    }, [currenPage]);

    const allPages = tests?.meta?.pagination?.pageCount;

    const pagesArray = [];

    if(allPages > 4) {
        for (let i = currenPage; i <= currenPage + 3 && i <= allPages; i++) {
            pagesArray.push(i);
        }
        if (pagesArray.length < 4) {
            const count = 4 - pagesArray.length;
            for (let i = 1; i <= count; i++) {
                let firsElement = pagesArray[0]
                pagesArray.unshift(firsElement - 1)
            }
        }
    } else {
        for (let i = 1; i <= allPages; i++) {
            pagesArray.push(i)
        }
    }


    const handleChange = (e) => {
        const data = e.target.value;
        setCurrentPage(1);
        data === '' ?
            dispatch(getTests({techId, pageNum: currenPage}))
            :
            dispatch(getTestsByQuery({query: data, pageNum: currenPage}))
    };


    return (
        <div className={css.test__page}>
            <div className={css.test__page_title}>{EN ? `${technology} tests` : `Тести з ${technology}`}</div>
            <div className={css.search__form_wrap}>
                <form>
                    <input
                        type="text"
                        className={css.search__input}
                        placeholder={EN ? 'Search...' : 'Пошук...'}
                        onChange={e => handleChange(e)}
                    />
                </form>
            </div>
            {!!tests?.data?.length &&
                <div className={css.tests__wrap}>
                    {!!tests?.data?.length && tests?.data?.map(test => <TestBlock key={test.id} test={test}/>)}
                </div>
            }
            <div className={css.pagination__wrap}>
                <div className={css.pagination__container}>
                    {allPages > 4 && <img className={css.arrow__left} src={currenPage === 1 ? DoubleArrowSideGrey : doubleArrowSide}
                          alt="arrow"
                          onClick={() => currenPage !== 1 && setCurrentPage(1)}/>}
                    <img className={css.arrow__left} src={currenPage === 1 ? arrowSideGrey : arrowSide} alt="arrow"
                         onClick={() => currenPage > 1 && setCurrentPage(currenPage - 1)}/>
                    {pagesArray?.map(page =>
                        <div onClick={()=> page !== currenPage && setCurrentPage(page)} className={currenPage === page ? css.pagination__number_active : css.pagination__number} key={page}>
                            {page}
                        </div>
                    )}

                    <img className={css.arrow__right} src={currenPage === allPages ? arrowSideGrey : arrowSide} alt="arrow"
                         onClick={() => currenPage < allPages && setCurrentPage(currenPage + 1)}/>
                    {allPages > 4 && <img className={css.arrow__right}
                          src={currenPage === allPages ? DoubleArrowSideGrey : doubleArrowSide} alt="arrow"
                          onClick={() => currenPage !== allPages && setCurrentPage(allPages)}/>}
                </div>
            </div>

        </div>
    );
};

export {TestListPage};