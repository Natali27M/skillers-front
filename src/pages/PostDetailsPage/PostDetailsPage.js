import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getPostById} from '../../store';
import {PostDetails} from '../../components';
import cssPosts from '../../components/ForCommunityPage/CommunityMain/Posts/Posts.module.css';

const PostDetailsPage = () => {
    const {postById} = useSelector(state => state['postReducers']);
    const {isDeletedComment, status} = useSelector(state => state['commentReducers']);

    const dispatch = useDispatch();
    const params = useParams();

    const postId = params.id;

    window.addEventListener("load", () => {
        dispatch(getPostById({postId}));
    });

    useEffect(() => {
        dispatch(getPostById({postId}));
    }, [isDeletedComment, status === 'fulfilled']);

    return (
        <div className={cssPosts.posts__main_box}>
            {postById &&
                <PostDetails key={postById.data.id} post={postById.data}/>
            }
        </div>
    );
};

export {PostDetailsPage};
