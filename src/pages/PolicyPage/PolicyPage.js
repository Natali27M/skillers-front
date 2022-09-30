import React from 'react';
import css from './PolicyPage.module.css';
import {useSelector} from 'react-redux';

const PolicyPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.policy__page}>
            <div className={css.policy__bg}></div>
            <div className={css.policy__wrap}>
                <div className={css.policy__title}>
                    {EN ? 'Privacy policy' : 'Політика конфіденційності'}
                </div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad atque aut corporis, dolor fugit
                illum iste iure magni molestiae natus nihil numquam officia, omnis porro quam tenetur vel. Eaque eveniet
                impedit nemo quos ratione. Amet eos iste minus, modi natus perferendis reprehenderit vitae. Asperiores
                ea est fuga iusto laborum magnam nemo possimus, provident similique ut? Ab adipisci alias animi
                assumenda cupiditate doloremque esse exercitationem explicabo facere harum id, ipsa modi molestias
                mollitia nemo neque perspiciatis porro possimus, quas quasi quisquam quod quos ratione reiciendis
                sapiente similique tempore ullam veritatis vero voluptatum. Dolor dolorem eum explicabo maxime quaerat
                rem reprehenderit?
            </div>
        </div>
    );
};

export {PolicyPage};