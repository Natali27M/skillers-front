import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import css from './YoutubeChannel.module.css';
import rootCss from '../../../styles/root.module.css';

const YoutubeChannel = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let element = document.querySelector('#skl__banner');
            let position;
            if (element !== null) {
                position = element.getBoundingClientRect();
            } else {
                return;
            }

            if (position.top < window.innerHeight && position.bottom >= 0) {
                setScrollTop(true);
            }
        });
    }, [scrollTop]);

    return (
        <div id="youtube__section" className={css.youtube__channel}>
            <div className={`${rootCss.default__title_24} ${css.youtube__title}`}>
                {EN ? 'Our YouTube channel' : 'Наш YouTube канал'}
            </div>
            {scrollTop &&
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
                </div>}
        </div>
    );
};

export {YoutubeChannel};
