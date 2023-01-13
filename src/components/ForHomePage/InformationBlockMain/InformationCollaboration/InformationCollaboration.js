import React from 'react';

import css from '../InformationTesting/InformationTesting.module.css';
import cssThis from './InformationCollaboration.module.css';
import collaboration from '../../../../images/information/collaboration.png';

const InformationCollaboration = () => {
    // const observer = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //         const square = entry.target.querySelector('.testing__img');
    //
    //         if (entry.isIntersecting) {
    //             square.classList.add('testing__img_active');
    //             return; // if we added the class, exit the function
    //         }
    //
    //         // We're not intersecting, so remove the class!
    //         square.classList.remove('testing__animation');
    //     });
    // });
    //
    // observer.observe(document.querySelector('.square-wrapper'));
    return (
        <div className={css.testing__main}>
            {/*<div className={cssThis.testing__animation}>*/}
            <img src={collaboration} alt="testing" className={cssThis.testing__img}/>
            {/*</div>*/}

            <div className={css.testing__text_box}>
                <h4 className={css.testing__header}>Collaborative programming</h4>

                <h5 className={css.testing__small_header}>Teamwork is always more effective.</h5>

                <p className={css.testing__description}>
                    Write code together, track changes in real time, solve problems and bugs together too, with online
                    coding from SKILLIANT.
                </p>
            </div>
            {/*<script>*/}
            {/*     const observer = new IntersectionObserver(entries => {*/}
            {/*         entries.forEach(entry => {*/}
            {/*             const square = entry.target.querySelector('.testing__img');*/}

            {/*             if (entry.isIntersecting) {*/}
            {/*                 square.classList.add('testing__img_active');*/}
            {/*                 return; // if we added the class, exit the function*/}
            {/*             }*/}

            {/*             // We're not intersecting, so remove the class!*/}
            {/*             square.classList.remove('testing__img_active');*/}
            {/*         })*/}
            {/*     });*/}

            {/*     observer.observe(document.querySelector('.square-wrapper'));*/}
            {/*</script>*/}
        </div>
    );
};

export {InformationCollaboration};
