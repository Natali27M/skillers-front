import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './TechBlock.module.css';
import arrow from '../../../images/all-tests-arrow.svg';
import numberTests from '../../../images/numberTests.png';
import star from '../../../images/star-rating.svg';
import {testsServices} from '../../../services';


const TechBlock = ({img, name, techId}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const [tests, setTests] = useState([]);
    const [numberTestsByCategory, setNumberTestsByCategory] = useState([]);
    const {pagination} = numberTestsByCategory;

    useEffect(() => {
        testsServices.getTopTestsByTech(techId).then(value => setTests(value.data));
        testsServices.getTopTestsByTech(techId).then(value => setNumberTestsByCategory(value.meta));
    }, []);


    return (
        <>
            {user ?
                <div className={css.for__slider_wrap}>
                    <div className={css.tech__block_wrap}>
                        <Link className={css.tech__block_loginUser} to={`/test-list/${techId}`}>

                            <img className={css.tech__img} src={img} alt="java"/>

                            <div className={css.teck__block_content}>
                                <div className={css.tech__block_title}>
                                    {name}
                                </div>

                                <div className={css.all__tests_block}>
                                    <div>{EN ? 'All tests' : 'Всі тести'}</div>
                                    <img src={arrow} alt="arrow"/>
                                </div>

                                <div className={css.numberTestsBox}>
                                    <img className={css.numberTestsIcon} src={numberTests} alt="numberTests"/>
                                    {pagination && <div className={css.numberTests}>{pagination?.total}</div>}
                                </div>

                            </div>

                        </Link>
                        {tests?.map(test =>
                            <Link to={`test/${test?.id}`} key={test.id} className={css.mini__test_block}>
                                <div className={css.mini__test_name}>
                                    {test?.attributes?.name}
                                </div>
                                <div className={css.mini__test_bottom}>
                                    <div className={css.mini__test_difficult}>
                                        {EN ? 'Difficult:' : 'Складність:'} {test?.attributes?.difficult}/10
                                    </div>
                                    {test?.attributes?.avgMark > 0 &&
                                        <div className={css.test__rating}>
                                            <img src={star} alt="star" className={css.start__img}/>
                                            <div>{test?.attributes?.avgMark || 0}</div>
                                        </div>
                                    }
                                </div>
                            </Link>
                        )}
                    </div>

                </div>

                :

                <div className={css.for__slider_wrap}>
                    <div className={css.tech__block_wrap}>
                        <Link className={css.tech__block} to={`/test-list/${techId}`}>

                            <img className={css.tech__img} src={img} alt="java"/>

                            <div className={css.teck__block_content}>
                                <div className={css.tech__block_title}>
                                    {name}
                                </div>

                                <div className={css.all__tests_block}>
                                    <div>{EN ? 'All tests' : 'Всі тести'}</div>
                                    <img src={arrow} alt="arrow"/>
                                </div>

                                <div className={css.numberTestsBox}>
                                    <img className={css.numberTestsIcon} src={numberTests} alt="numberTests"/>
                                    {pagination && <div className={css.numberTests}>{pagination?.total}</div>}
                                </div>

                            </div>

                        </Link>
                        {tests?.map(test =>
                            <Link to={`test/${test?.id}`} key={test.id} className={css.mini__test_block}>
                                <div className={css.mini__test_name}>
                                    {test?.attributes?.name}
                                </div>
                                <div className={css.mini__test_bottom}>
                                    <div className={css.mini__test_difficult}>
                                        {EN ? 'Difficult:' : 'Складність:'} {test?.attributes?.difficult}/10
                                    </div>
                                    {test?.attributes?.avgMark > 0 &&
                                        <div className={css.test__rating}>
                                            <img src={star} alt="star" className={css.start__img}/>
                                            <div>{test?.attributes?.avgMark || 0}</div>
                                        </div>
                                    }
                                </div>
                            </Link>
                        )}
                    </div>

                </div>
            }
        </>
    );
};

export {TechBlock};
