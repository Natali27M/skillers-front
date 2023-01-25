import React from 'react';

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';


const PostIdea = () => {
    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <h1>Post my idea</h1>
            </div>
        </div>
    );
};

export {PostIdea};
