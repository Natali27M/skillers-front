import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './TechBlock.module.css';
import arrow from '../../../images/all-tests-arrow.svg';
import numberTests from '../../../images/numberTests.png';
import star from '../../../images/star-rating.svg';
import {codeTestServices, testsServices} from '../../../services';


const TechBlock = ({img, name, techId, techListLoad}) => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [tests, setTests] = useState([]);
    const [numberTestsByCategory, setNumberTestsByCategory] = useState(null);

    useEffect(() => {
        if ((techId !== 7 && techId !== 8 && techId !== 9 && techId !== 10) || techListLoad) {
            testsServices.getTopTestsByTech(techId).then(value => {
                if (techId !== 8 && techId !== 9 && techId !== 10) {
                    codeTestServices.getTopTestsByTech(techId).then(codeValue => {
                        setNumberTestsByCategory(codeValue?.meta?.pagination?.total + value?.meta?.pagination?.total);
                        let resultTests = value.data;
                        resultTests.pop();
                        resultTests.push(codeValue.data[0]);
                        setTests(resultTests);
                    });
                } else {
                    setTests(value.data);
                    setNumberTestsByCategory(value?.meta?.pagination?.total);
                }
            });
        }
    }, [techListLoad]);


    return (
        <>
            <div className={css.for__slider_wrap}>
                <div className={css.tech__block_wrap}>

                    {!tests.length ?
                        <Link className={css.tech__block} to={`/test-list/${techId}`}>
                            <div className={css.tech__img_loading}></div>
                            <div className={css.teck__block_content_loading}>
                                <div className={css.tech__block_title_loading}></div>
                                <div className={css.all__tests_block_loading}></div>
                            </div>
                        </Link>
                        :
                        <Link className={css.tech__block} to={`/test-list/${techId}`}>
                            <img className={css.tech__img} src={img} alt="java"/>

                            <div className={css.teck__block_content}>
                                <div className={css.tech__block_title}>
                                    {name}
                                </div>

                                <div className={css.all__tests_block}>
                                    <div className={css.number__tests_box}>
                                        <img className={css.number__tests_icon} src={numberTests} alt="numberTests"/>
                                        {numberTestsByCategory &&
                                            <div className={css.number__tests}>{numberTestsByCategory}</div>}
                                    </div>

                                    <div className={css.arrow_test}>
                                        <div>{EN ? 'All tests' : 'Всі тести'}</div>
                                        <img className={css.arrow} src={arrow} alt="arrow"/>
                                    </div>
                                </div>

                            </div>

                        </Link>
                    }

                    {!tests?.length ?
                        <div className={css.test_block_loading}>
                            <div className={css.mini__test_block_loading}></div>
                            <div className={css.mini__test_block_loading}></div>
                            <div className={css.mini__test_block_loading}></div>
                            <div className={css.mini__test_block_loading}></div>
                            <div className={css.mini__test_block_loading}></div>
                        </div>
                        :
                        tests.map(test =>
                            <Link to={`test/${test?.id}`} key={test.id} className={css.mini__test_block}>
                                <div className={css.mini__test_name}>
                                    {test?.attributes?.name || test?.attributes?.testName}
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
        </>
    );
};

export {TechBlock};
