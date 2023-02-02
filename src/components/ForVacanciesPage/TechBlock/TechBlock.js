import React from 'react';

import css from './TechBlock.module.css';

const TechBlock = ({technology}) =>{
    return (
        <div className={css.tech__block}>
            {technology?.value}
        </div>
    );
};

export {TechBlock};
