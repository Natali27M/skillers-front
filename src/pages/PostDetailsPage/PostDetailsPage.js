import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Helmet} from "react-helmet-async";

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


    const title = 'Read post';
    const description = 'Read post details and leave a your comments';
    const url = `https://skilliant.net/post/${postId}`;

    return (
        <div className={cssPosts.posts__main_box}>
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

            {postById &&
                <PostDetails key={postById.data.id} post={postById.data}/>
            }
        </div>
    );
};

export {PostDetailsPage};
