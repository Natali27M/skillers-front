import React from 'react';
import {useParams} from "react-router-dom";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';

const IdeaDetails = () => {
    const {id} = useParams();


    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <h1>Idea details page {id}</h1>
            </div>
        </div>
    );
};

export {IdeaDetails};
