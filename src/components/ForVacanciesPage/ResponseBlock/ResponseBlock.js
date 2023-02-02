import React, {useState} from 'react';

import github from '../../../images/vacancy/github.svg';
import linkedin from '../../../images/vacancy/linkedin.svg';
import cv from '../../../images/vacancy/cv.svg';

import css from './ResponseBlock.module.css';
import vacancyTimeDisplay from '../../../RootFunctions/vacancyTimeDisplay';
import {useSelector} from 'react-redux';
import coverLetterDisplay from '../../../RootFunctions/coverLetterDisplay';

const ResponseBlock = ({response}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [emailCopyTime, setEmailCopyTime] = useState(false);

    const [fullLetter, setFullLetter] = useState(false);

    const emailCopy = () => {
        setEmailCopyTime(true);
        navigator.clipboard.writeText(response?.attributes?.email);
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    const coverLength = response?.attributes?.coverLetter.split(' ').length;

    return (
        <div className={css.response__block}>
            <h3 className={css.response__username}>
                {response?.attributes?.userName}
            </h3>
            <h6 className={css.response__time}>{vacancyTimeDisplay(response?.attributes?.createdAt, EN)}</h6>

            <p className={css.cover__letter}>
                {coverLength > 50
                    ?
                    coverLetterDisplay(response?.attributes?.coverLetter, fullLetter)
                    :
                    response?.attributes?.coverLetter
                }
                {coverLength > 50 &&
                    <span className={css.show__letter} onClick={() => setFullLetter(!fullLetter)}>
                        {fullLetter ? (EN ? 'Hide' : 'Сховати') : (EN ? 'Show more' : 'Показати більше')}
                    </span>
                }
            </p>
            <div className={css.data__links}>

                {response?.attributes?.github &&
                    <a target="_blank" href={response?.attributes?.github}>
                        <img src={github} alt="github"/>
                    </a>}
                {response?.attributes?.linkedin &&
                    <a target="_blank" href={response?.attributes?.linkedin}>
                        <img src={linkedin} alt="linkedin"/>
                    </a>
                }
                {response?.attributes?.cv &&
                    <a target="_blank" href={response?.attributes?.cv}>
                        <img src={cv} alt="cv"/>
                    </a>
                }
                <h4 onClick={() => emailCopy()} className={css.response__email}>
                    {emailCopyTime ? (EN ? 'Copied!' : 'Скопійовано') : response?.attributes?.email}
                </h4>
            </div>
        </div>
    );
};

export {ResponseBlock};
