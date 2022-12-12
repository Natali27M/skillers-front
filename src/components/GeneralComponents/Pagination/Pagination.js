import React from 'react';

import css from '../../../components/GeneralComponents/Pagination/Pagination.module.css';
import DoubleArrowSideGrey from '../../../images/dobleArrow-grey.svg';
import doubleArrowSide from '../../../images/dobleArrow.svg';
import arrowSideGrey from '../../../images/arrow-grey.svg';
import arrowSide from '../../../images/arrow.svg';

const Pagination = ({setCurrentPage, currentPage, allPages, setUserId, pagesArray}) => {

    return (
        <>
            {
                pagesArray.length ?
                    <div className={css.pagination__wrap}>
                        <div className={css.pagination__container}>
                            <img className={css.arrow__left} src={currentPage === 1 ? DoubleArrowSideGrey : doubleArrowSide}
                                 alt="arrow"
                                 onClick={() => currentPage !== 1 && setCurrentPage(1) || setUserId(null)}/>

                            <img className={css.arrow__left} src={currentPage === 1 ? arrowSideGrey : arrowSide} alt="arrow"
                                 onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1) || setUserId(null)}/>

                            {pagesArray?.map(page =>
                                <div onClick={() => page !== currentPage && setCurrentPage(page) || setUserId(null)}
                                     className={currentPage === page ? css.pagination__number_active : css.pagination__number}
                                     key={page}>
                                    {page}
                                </div>
                            )}

                            <img className={css.arrow__right} src={currentPage === allPages ? arrowSideGrey : arrowSide}
                                 alt="arrow"
                                 onClick={() => currentPage < allPages && setCurrentPage(currentPage + 1) || setUserId(null)}/>

                            <img className={css.arrow__right}
                                 src={currentPage === allPages ? DoubleArrowSideGrey : doubleArrowSide}
                                 alt="arrow"
                                 onClick={() => currentPage !== allPages && setCurrentPage(allPages) || setUserId(null)}/>
                        </div>
                    </div>
                    :
                    <div className={css.pagination__wrap_none}></div>
            }
        </>
    );
};

export {Pagination};
