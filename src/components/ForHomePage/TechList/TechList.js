import React, {useState} from 'react';
import css from './TechList.module.css';
import {useSelector} from 'react-redux';
import ReactSimplyCarousel from 'react-simply-carousel';


import java from '../../../images/techList/java.svg';
import python from '../../../images/techList/python.svg';
import nodejs from '../../../images/techList/nodejs.svg';
import csharp from '../../../images/techList/csharp.svg';
import cplusplus from '../../../images/techList/cplusplus.svg';
import html5 from '../../../images/techList/html5.svg';
import other from '../../../images/techList/other.svg';
import {TechBlock} from '../TechBlock/TechBlock';


const TechList = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);


    return (
        <div className={css.tech__wrap}>
            <h4 className={css.tech__title}>
                {EN ? 'Choose technology' : 'Виберіть технологію'}
            </h4>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={4}
                itemsToScroll={1}
                containerProps={{
                    style: {
                        width: "100%",
                        justifyContent: "center",
                        columnGap: "10px",
                        userSelect: "text"
                    }
                }}
                forwardBtnProps={{
                    className: css.carousel__btn,
                    style: {
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        userSelect: 'none',
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    className: css.carousel__btn,
                    style: {
                        userSelect: 'none',
                        alignSelf: 'center',
                        background: 'black',
                        border: 'none',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        height: 30,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 30,
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 3,
                        itemsToScroll: 1,
                        maxWidth: 1260,
                    },
                    {
                        itemsToShow: 2,
                        itemsToScroll: 1,
                        maxWidth: 1000,
                    },
                    {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                        maxWidth: 520,
                    },
                    {
                        style: {
                          columnGap: "10px"
                        },
                        maxWidth: 380,
                    }
                ]}
                speed={400}
                easing="linear"
            >
                <TechBlock img={java} name={"Java"} techId={3}/>
                <TechBlock img={python} name={"Python"} techId={4}/>
                <TechBlock img={nodejs} name={"NodeJS"} techId={5}/>
                <TechBlock img={csharp} name={"C#"} techId={6}/>
                <TechBlock img={cplusplus} name={"C++"} techId={7}/>
                <TechBlock img={html5} name={"HTML"} techId={8}/>
                <TechBlock img={other} name={"Other"} techId={9}/>

            </ReactSimplyCarousel>


        </div>
    );
};

export {TechList};