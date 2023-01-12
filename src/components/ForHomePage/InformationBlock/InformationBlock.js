import React from 'react';

import css from './InformationBlock.module.css';

import {InformationTesting} from '../InformationTesting/InformationTesting';
import {InformationCollaboration} from '../InformationCollaboration/InformationCollaboration';

const InformationBlock = () => {
    return (
        <div className={css.information__main}>
            <InformationTesting/>
            <InformationCollaboration/>
        </div>
    );
};

export {InformationBlock};
