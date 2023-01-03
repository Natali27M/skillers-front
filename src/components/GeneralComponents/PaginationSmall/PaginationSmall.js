import React from 'react';
import css from './PaginationSmall.module.css';
import arrow from '../../../images/arrow.svg';

const PaginationSmall = ({pageNumber, setPageNumber, pageCount}) => {
    return (
        <div className={css.pagination__block}>
            <img className={css.arrow__left}
                 onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
                 src={arrow} alt="arrow"/>
            <div>{pageNumber}/{pageCount}</div>
            <img className={css.arrow__right} src={arrow}
                 onClick={() => pageNumber < pageCount
                     &&
                     setPageNumber(pageNumber + 1)}
                 alt="arrow"/>
        </div>
    );
};

export {PaginationSmall};
