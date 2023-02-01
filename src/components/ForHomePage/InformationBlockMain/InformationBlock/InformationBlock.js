import React from 'react';

import css from './InformationBlock.module.css';
import {InformationTesting} from '../InformationTesting/InformationTesting';
import {InformationCollaboration} from '../InformationCollaboration/InformationCollaboration';
import {InformationTelegram} from '../InformationTelegram/InformationTelegram';

const InformationBlock = ({setGetLeaderBoard}) => {
    return (
        <div className={css.information__main}>
            <InformationTesting/>
            <InformationCollaboration setGetLeaderBoard={setGetLeaderBoard}/>
            <InformationTelegram/>
        </div>
    );
};

export {InformationBlock};
