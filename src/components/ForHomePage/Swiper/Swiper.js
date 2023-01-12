import React, {useRef} from 'react';
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import css from './Swiper.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {TechBlock} from "../TechBlock/TechBlock";
import java from "../../../images/techList/java.svg";
import python from "../../../images/techList/python.svg";
import js from "../../../images/techList/javascript.svg";
import csharp from "../../../images/techList/csharp.svg";
import cplusplus from "../../../images/techList/cplusplus.svg";
import html5 from "../../../images/techList/html5.svg";
import other from "../../../images/techList/other.svg";
import project_manager from "../../../images/techList/project-manager.svg";

const SwiperComponent = () => {
    const prev = useRef(null);
    const next = useRef(null);

    return (
        <div className={css.container}>
            <div className={css.prev} ref={prev}>{'<'}</div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={4}
                effect={'coverflow'}
                navigation={{
                    prevEl: prev.current,
                    nextEl: next.current,
                }}
                className={css.my_swiper}
                direction={'horizontal'}
                speed={800}
                loop={true}
                breakpoints={
                    {
                        100: {
                            slidesPerView: 1
                        },
                        320: {
                            slidesPerView: 1
                        },
                        641: {
                            slidesPerView: 2,
                        },
                        921: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1420: {
                            slidesPerView: 4,
                        }
                    }
                }
            >

                <SwiperSlide>
                    <TechBlock img={java} name={"Java"} techId={3}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={python} name={"Python"} techId={4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={js} name={"JavaScript"} techId={5}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={csharp} name={"C#"} techId={6}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={cplusplus} name={"C++"} techId={7}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={html5} name={"HTML"} techId={8}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={other} name={"Other"} techId={9}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TechBlock img={project_manager} name={"Management"} techId={10}/>
                </SwiperSlide>
            </Swiper>
            <div className={css.next} ref={next}>></div>
        </div>
    );
};

export {SwiperComponent};
