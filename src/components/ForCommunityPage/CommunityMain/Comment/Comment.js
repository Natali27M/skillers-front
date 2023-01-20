import React, {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import css from "./Comment.module.css";
import cssPost from "../Post/Post.module.css";
import {MoreComment} from '../MoreComment/MoreComment';

const Comment = ({comment, comments}) => {
    const [moreComments, setMoreComments] = useState(false);
    const createdAt = comment.attributes.createdAt.split('T');

    const clickMoreComments = () => {
        if (!moreComments) {
            setMoreComments(true);
        } else {
            setMoreComments(false);
        }
    }

    return (
        <div>
            <div className={css.comment__block}>
                <div className={cssPost.post__block_header}>
                    <div className={cssPost.post__username}>{comment.attributes.username}</div>
                    <div className={cssPost.post__createdAt}>{createdAt[0]}</div>
                </div>
                <SyntaxHighlighter className={css.comment__block_box}>
                    {comment.attributes.comment}
                </SyntaxHighlighter>
            </div>
            {comments.length > 1 &&
                <div onClick={clickMoreComments} className={css.comment__block_more}>More comments</div>
            }
            {moreComments &&  comments.slice(1).map(value => <MoreComment key={value.id} comment={value}/>)}
        </div>
    );
};

export {Comment};
