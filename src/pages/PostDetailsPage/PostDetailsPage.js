import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getPostById} from '../../store';
import {PostDetails} from '../../components';

const PostDetailsPage = () => {
    const {postById} = useSelector(state => state['postReducers']);
    const {isDeletedComment} = useSelector(state => state['commentReducers']);
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id;

    window.addEventListener("load", () => {
        dispatch(getPostById({postId}));
    });

    useEffect(() => {
        dispatch(getPostById({postId}));
    },[isDeletedComment])

    return (
        <div>
            {postById &&
                <PostDetails key={postById.data.id} post={postById.data}/>
            }
        </div>
    );
};

export {PostDetailsPage};
