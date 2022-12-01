import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import css from './TechDropdown.module.css';
import {clearCreateTest, getTechNames, setTechnology} from '../../../store';
import dropArrow from '../../../images/arrow-color.png';
import useComponentVisible from '../../../RootFunctions/useComponentVisible';
import useWindowDimensions from '../../../RootFunctions/WindowDimensions';

const TechDropdown = () => {
    const {technology, techNames} = useSelector(state => state['createTestsReducers']);

    const {EN} = useSelector(state => state['languageReducers']);

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

    const {width} = useWindowDimensions();

    const {pathname} = useLocation();

    const dispatch = useDispatch();

    const [openDrop, setOpenDrop] = useState(false);

    useEffect(() => {
        setOpenDrop(false);
    }, [technology]);

    useEffect(() => {
        if (!isComponentVisible) {
            setOpenDrop(false);
            setIsComponentVisible(true);
        }
    }, [isComponentVisible]);


    useEffect(() => {
        setOpenDrop(false)
    }, [width]);

    useEffect(() => {
        dispatch(clearCreateTest());
        dispatch(getTechNames());
    }, []);


    return (
        <div className={css.tech__dropdown} ref={ref}>
            <div className={css.drop__header} onClick={() => setOpenDrop(!openDrop)}>
                <div className={css.tech__drop_text}>
                    {technology ? technology?.attributes?.name :
                        <span className={css.placeholder}>{EN ? 'Choose technology' : 'Виберіть технологію'}</span>}
                </div>
                <div className={openDrop ? css.tech__drop_arrow_side : css.tech__drop_arrow}>
                    <img src={dropArrow} alt="dropArrow"/>
                </div>
            </div>
            <div className={openDrop ? css.dropdown__menu : css.drop__hide}>
                {techNames?.length && techNames.map(tech =>
                    <div className={css.block__wrap} key={tech.id}>{tech !== technology &&
                        <div key={tech.id} onClick={() => dispatch(setTechnology(tech))} className={css.tech__block}>
                            {tech?.attributes?.name}
                        </div>
                    }</div>
                )}
            </div>
        </div>
    );
};

export {TechDropdown};
