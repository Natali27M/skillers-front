import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getPostById} from '../../store';
import {Post} from '../../components';

const PostDetailsPage = () => {
    const {postById} = useSelector(state => state['postReducers']);
    const dispatch = useDispatch();
    const params = useParams();
    const postId = params.id;

    if(!postById) {
        dispatch(getPostById({postId}));
    }

    return (
        <div>
            {postById &&
                <Post key={postById.data.id} post={postById.data}/>
            }
        </div>
    );
};

export {PostDetailsPage};
