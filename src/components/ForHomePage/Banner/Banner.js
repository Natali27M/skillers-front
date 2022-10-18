import React from 'react';
import css from './Banner.module.css'
import banner from '../../../images/saveLife.png'
import {useSelector} from 'react-redux';


const Banner = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    return (
        <a href='https://savelife.in.ua/' target='_blank' className={css.banner}>
            <img src={banner} alt='banner' />
            <div className={css.banner__text}>
             {EN ? 'Help' :'Допоможіть' } <br/> {EN ? 'Ukrainian' :'Українській' } <br/> {EN ? 'army' :'армії'}
            </div>
        </a>
    );
};

export { Banner };
