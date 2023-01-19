import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './Posts.module.css';
import {getAllPosts} from '../../../../store';
import {Post} from '../Post/Post';

const Posts = () => {
    const {posts} = useSelector(state => state['postReducers']);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getAllPosts());
    }, [posts]);

    return (
        <div>
            {posts?.data?.length && posts?.data?.map(value => <Post key={value.id} post={value}/>)}
        </div>
    );
};

export {Posts};
