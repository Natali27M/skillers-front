import React from 'react';

import css from "./Comment.module.css";

const Comment = ({comment, user}) => {

    return (
        <div className={css.comment__block}>
          <div>{user.username}</div>
          <div>{comment.attributes.comment}</div>
        </div>
    );
};

export {Comment};
