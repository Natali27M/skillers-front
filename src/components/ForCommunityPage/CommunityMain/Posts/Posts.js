import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './Posts.module.css';
import {getAllPosts} from '../../../../store';
import {Post} from '../Post/Post';
import {PaginationSmall} from '../../../GeneralComponents';
import {Helmet} from "react-helmet-async";

const Posts = () => {
    const {posts} = useSelector(state => state['postReducers']);
    const {status} = useSelector(state => state['commentReducers']);

    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const [deleteFullPost, setDeleteFullPost] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts({pageNumber}));
        setDeleteFullPost(false);
    }, [status === 'fulfilled', pageNumber, deleteFullPost === true]);

    const title = 'Read community posts';
    const description = 'Read community posts and leave a your comments';
    const url = `https://skilliant.net/community/home`;

    return (
        <div className={css.posts__main_box}>
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

            <div className={css.posts__main}>
                {posts?.data?.length ? posts?.data?.map(value =>
                        <Post key={value.id} post={value} setDeleteFullPost={setDeleteFullPost}/>)
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
