import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './Posts.module.css';
import {getAllPosts} from '../../../../store';
import {Post} from '../Post/Post';

const Posts = () => {
    const {posts} = useSelector(state => state['postReducers']);
    const {status} = useSelector(state => state['commentReducers']);
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(getAllPosts());
    }, [status==='fulfilled']);

    return (
        <div className={css.posts__main}>
            {posts?.data?.length && posts?.data?.map(value => <Post key={value.id} post={value}/>)}
        </div>
    );
};

export {Posts};
