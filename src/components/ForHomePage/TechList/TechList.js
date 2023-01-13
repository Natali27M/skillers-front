import React from 'react';
import {useSelector} from 'react-redux';

import css from './TechList.module.css';
import rootCSS from '../../../styles/root.module.css'
import {SwiperComponent} from "../Swiper/Swiper";


const TechList = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);


    return (
        <>
            <div className={user ? css.tech__wrap_loginUser : css.tech__wrap}>

                <h4 className={rootCSS.default__title_24}>
                    {EN ? 'Choose your quiz' : 'Виберіть тест'}
                </h4>

                {/*<ReactSimplyCarousel*/}
                {/*    activeSlideIndex={activeSlideIndex}*/}
                {/*    onRequestChange={setActiveSlideIndex}*/}
                {/*    itemsToShow={4}*/}
                {/*    itemsToScroll={1}*/}
                {/*    containerProps={{*/}
                {/*        style: {*/}
                {/*            width: "100%",*/}
                {/*            justifyContent: "center",*/}
                {/*            columnGap: "10px",*/}
                {/*            userSelect: "text",*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    forwardBtnProps={{*/}
                {/*        className: css.carousel__btn,*/}
                {/*        style: {*/}
                {/*            alignSelf: 'center',*/}
                {/*            background: 'black',*/}
                {/*            border: 'none',*/}
                {/*            borderRadius: '50%',*/}
                {/*            color: 'white',*/}
                {/*            cursor: 'pointer',*/}
                {/*            fontSize: '20px',*/}
                {/*            height: 30,*/}
                {/*            lineHeight: 1,*/}
                {/*            userSelect: 'none',*/}
                {/*            textAlign: 'center',*/}
                {/*            width: 30,*/}
                {/*        },*/}
                {/*        children: <span>{`>`}</span>,*/}
                {/*    }}*/}
                {/*    backwardBtnProps={{*/}
                {/*        className: css.carousel__btn,*/}
                {/*        style: {*/}
                {/*            userSelect: 'none',*/}
                {/*            alignSelf: 'center',*/}
                {/*            background: 'black',*/}
                {/*            border: 'none',*/}
                {/*            borderRadius: '50%',*/}
                {/*            color: 'white',*/}
                {/*            cursor: 'pointer',*/}
                {/*            fontSize: '20px',*/}
                {/*            height: 30,*/}
                {/*            lineHeight: 1,*/}
                {/*            textAlign: 'center',*/}
                {/*            width: 30,*/}
                {/*        },*/}
                {/*        children: <span>{`<`}</span>,*/}
                {/*    }}*/}
                {/*    responsiveProps={[*/}
                {/*        {*/}
                {/*            itemsToShow: 3,*/}
                {/*            itemsToScroll: 1,*/}
                {/*            maxWidth: 1260,*/}
                {/*        },*/}
                {/*        {*/}
                {/*            itemsToShow: 2,*/}
                {/*            itemsToScroll: 1,*/}
                {/*            maxWidth: 1000,*/}
                {/*        },*/}
                {/*        {*/}
                {/*            itemsToShow: 1,*/}
                {/*            itemsToScroll: 1,*/}
                {/*            maxWidth: 520,*/}
                {/*        },*/}
                {/*        {*/}
                {/*            style: {*/}
                {/*                columnGap: "10px"*/}
                {/*            },*/}
                {/*            maxWidth: 380,*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*    speed={400}*/}
                {/*    easing="linear"*/}
                {/*>*/}
                {/*    <TechBlock img={java} name={"Java"} techId={3}/>*/}
                {/*    <TechBlock img={python} name={"Python"} techId={4}/>*/}
                {/*    <TechBlock img={js} name={"JavaScript"} techId={5}/>*/}
                {/*    <TechBlock img={csharp} name={"C#"} techId={6}/>*/}
                {/*    <TechBlock img={cplusplus} name={"C++"} techId={7}/>*/}
                {/*    <TechBlock img={html5} name={"HTML"} techId={8}/>*/}
                {/*    <TechBlock img={other} name={"Other"} techId={9}/>*/}
                {/*    <TechBlock img={project_manager} name={"Management"} techId={10}/>*/}
                {/*</ReactSimplyCarousel>*/}

                <SwiperComponent/>
            </div>
        </>
    );
};

export {TechList};
