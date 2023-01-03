import React from 'react';
import {useSelector} from 'react-redux';

import css from './YoutubeChannel.module.css';
import rootCss from '../../../styles/root.module.css';

const YoutubeChannel = () => {
    const {EN} = useSelector(state => state['languageReducers']);


    return (
        <div className={css.youtube__channel}>
            <div className={`${rootCss.default__title_24} ${css.youtube__title}`}>
                {EN ? 'Our YouTube channel' : 'Наш YouTube канал'}
            </div>
            <div className={css.video__wrap}>
                <div className={css.video__wrap}>
                    <iframe
                        className={css.video__frame}
                        src="https://www.youtube.com/embed?listType=playlist&list=UUecsHUnd9DuQSyYZRMQ2rRQ"></iframe>
                    <iframe
                        className={css.video__frame}
                        src="https://www.youtube.com/embed?listType=playlist&list=UUecsHUnd9DuQSyYZRMQ2rRQ&index=2"></iframe>
                </div>
                <div className={css.video__wrap}>
                    <iframe
                        className={css.video__frame}
                        src="https://www.youtube.com/embed?listType=playlist&list=UUecsHUnd9DuQSyYZRMQ2rRQ&index=3"></iframe>
                    <iframe
                        className={css.video__frame}
                        src="https://www.youtube.com/embed?listType=playlist&list=UUecsHUnd9DuQSyYZRMQ2rRQ&index=4"></iframe>
                </div>
            </div>
        </div>
    );
};

export {YoutubeChannel};