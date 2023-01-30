import React from 'react';
import {useNavigate} from "react-router-dom";

import css from './OneIdea.module.css';
import user from '../../../../images/user.svg';

const OneIdea = ({idea}) => {
    const navigate = useNavigate();


    return (
        <div className={css.idea_container} onClick={() => navigate(`/community/idea/${idea.id}`)}>
            <div className={css.user}>
                <div className={css.user_name}>{idea.attributes.userName}</div>
                <img src={user} alt="user"/>
            </div>
            <div className={css.idea_title}>
                {idea.attributes.title}
            </div>
            <div className={css.idea_description}>
                {
                    idea.attributes?.description?.length > 440 ? `${idea.attributes.description.slice(0, 440)}` + '...' : idea.attributes.description
                }
            </div>

            <div className={css.idea_technologies}>
                {
                    idea?.attributes?.technologies?.data?.length > 0 && idea?.attributes.technologies?.data.map(value =>
                        <div key={value.id} className={css.technology}>
                            {value.attributes.value}
                        </div>
                    )
                }
            </div>

            <div className={css.idea_categories}>
                {
                    idea?.attributes?.categories?.data?.length > 0 && idea?.attributes.categories?.data.map(value =>
                        <div key={value.id} className={css.category}>
                            {value.attributes.value}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export {OneIdea};
