import React from 'react';

import css from '../Comment/Comment.module.css';
import cssPost from '../Post/Post.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';

const MoreComment = ({comment}) => {
    const createdAt = comment.attributes.createdAt.split('T');

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
        </div>
    );
};

export {MoreComment};
