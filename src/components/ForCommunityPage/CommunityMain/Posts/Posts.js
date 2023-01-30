import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './Posts.module.css';
import {getAllPosts} from '../../../../store';
import {Post} from '../Post/Post';
import {PaginationSmall} from '../../../GeneralComponents';

const Posts = () => {
    const {posts} = useSelector(state => state['postReducers']);
    const {status} = useSelector(state => state['commentReducers']);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getAllPosts({pageNumber}));
    }, [status === 'fulfilled', pageNumber]);

    return (
        <div className={css.posts__main_box}>
            <div className={css.posts__main}>
                {posts?.data?.length ? posts?.data?.map(value => <Post key={value.id} post={value}/>)
                    :
                    <div className={css.loading__main_post}>
                        <div className={css.loading__header}>
                            <div className={css.loading__userName}></div>
                            <div className={css.loading__createdAt}></div>
                        </div>
                        <div className={css.loading__title}></div>
                        <div className={css.loading__line}></div>
                        <div className={css.loading__testName}></div>
                        <div className={css.loading__left_block}>
                            <div className={css.loading__createdAt}></div>
                            <div className={css.loading__createdAt}></div>
                        </div>
                        <div className={css.loading__img}></div>
                        <div className={css.loading__hr}></div>
                        <div className={css.loading__footer}>
                            <div className={css.loading__comment}></div>
                        </div>
                    </div>
                }

                <PaginationSmall
                    pageNumber={posts?.meta?.pagination.page}
                    setPageNumber={setPageNumber}
                    pageCount={posts?.meta?.pagination.pageCount}/>
            </div>
        </div>
    );
};

export {Posts};
