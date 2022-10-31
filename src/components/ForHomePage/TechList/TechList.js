import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ReactSimplyCarousel from 'react-simply-carousel';

import css from './TechList.module.css';
import rootCSS from '../../../styles/root.module.css'
import java from '../../../images/techList/java.svg';
import python from '../../../images/techList/python.svg';
import js from '../../../images/techList/javascript.svg';
import csharp from '../../../images/techList/csharp.svg';
import cplusplus from '../../../images/techList/cplusplus.svg';
import html5 from '../../../images/techList/html5.svg';
import other from '../../../images/techList/other.svg';
import project_manager from '../../../images/techList/project-manager.svg';
import {TechBlock} from '../TechBlock/TechBlock';


const TechList = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);


    return (
        <div className={css.tech__wrap}>
            <h4 className={rootCSS.default__title_24}>
                {EN ? 'Choose your quiz' : 'Виберіть тест'}
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
                        userSelect: "text",
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
                <TechBlock img={js} name={"JavaScript"} techId={5}/>
                <TechBlock img={csharp} name={"C#"} techId={6}/>
                <TechBlock img={cplusplus} name={"C++"} techId={7}/>
                <TechBlock img={html5} name={"HTML"} techId={8}/>
                <TechBlock img={other} name={"Other"} techId={9}/>
                <TechBlock img={project_manager} name={"Management"} techId={10}/>
            </ReactSimplyCarousel>

        </div>
    );
};

export {TechList};
