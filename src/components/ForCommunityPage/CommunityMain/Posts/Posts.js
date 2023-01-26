import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import css from './Posts.module.css';
import cssCourses from '../../../../pages/ForUserPage/ForUserPage.module.css';
import {getAllPosts} from '../../../../store';
import {Post} from '../Post/Post';
import {PaginationSmall} from '../../../GeneralComponents';
import pm from '../../../../images/useful_links/pm.png';
import tm from '../../../../images/useful_links/tm.png';
import course from '../../../../images/useful_links/course.png';

const Posts = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {posts} = useSelector(state => state['postReducers']);
    const {status} = useSelector(state => state['commentReducers']);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [scrollTop, setScrollTop] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts({pageNumber}));
    }, [status === 'fulfilled', pageNumber]);

    const element = document.getElementById("#posts__courses");

    window.addEventListener("scroll", function () {
        let position;
        if (element !== null) {
            position = element.getBoundingClientRect();
        } else {
            return;
        }

        if (position.top < -40) {
            setScrollTop(true);
        } else {
            setScrollTop(false);
        }
    });

    return (
        <div className={css.posts__main_box}>
            <div className={css.posts__main_left}>HELLO</div>

            <div className={css.posts__main}>
                {posts?.data?.length ? posts?.data?.map(value => <Post key={value.id} post={value}/>)
                    :
                    <div className={css.loading__main_post}>
                        <div className={css.loading__header}>
                            <div className={css.loading__userName}></div>
                            <div className={css.loading__createdAt}></div>
                        </div>
                        <div className={css.loading__title}></div>
                        <div className={css.loading__line}></div>
                        <div className={css.loading__testName}></div>
                        <div className={css.loading__left_block}>
                            <div className={css.loading__createdAt}></div>
                            <div className={css.loading__createdAt}></div>
                        </div>
                        <div className={css.loading__img}></div>
                        <div className={css.loading__hr}></div>
                        <div className={css.loading__footer}>
                            <div className={css.loading__comment}></div>
                        </div>
                    </div>
                }

                <PaginationSmall
                    pageNumber={posts?.meta?.pagination.page}
                    setPageNumber={setPageNumber}
                    pageCount={posts?.meta?.pagination.pageCount}/>
            </div>

            <div id="#posts__courses" className={css.posts__courses}>
                <div className={scrollTop ? css.courses__wrap : css.courses__wrap_no}>
                    <a href={'https://www.udemy.com/course/software-project-management-max'}
                       className={cssCourses.course__block} target="_blank">
                        <img src={pm} alt="pm"/>
                        <div className={cssCourses.course__title}>
                            IT Project Management
                        </div>
                        {EN ? <div className={cssCourses.course__description}>
                                Gain creative problem-solving skills and easy-to-use tools. This course is designed
                                with a minimum entry threshold, even if you have no previous experience <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={cssCourses.course__description}>
                                Отримайте творчі навички вирішення проблем і прості у використанні інструменти. Цей курс
                                розроблено з мінімальним порогом вступу, навіть якщо у вас немає попереднього досвіду
                            </div>}
                    </a>
                    <a href={'https://www.udemy.com/course/text-mining-max'}
                       className={cssCourses.course__block} target="_blank">
                        <img src={tm} alt="tm"/>
                        <div className={cssCourses.course__title}>
                            Text Mining. {EN ? 'Fundamentals and applied problems' : 'Основи та прикладні задачі'}
                        </div>
                        {EN ? <div className={cssCourses.course__description}>
                                The course of text analysis and text classification, different approaches and variations of
                                methods of working with large masses are considered <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={cssCourses.course__description}>
                                Розглянуто курс аналізу тексту та класифікації тексту, різні підходи та варіації методів
                                роботи з великими масами
                            </div>}
                    </a>
                    <a href={'https://www.udemy.com/share/101WFu3@mX-E6oR_Mt252y6Lw8Mj-xH-wwsIDa4nPKunEpdNI8UkOeKvJiPA09kV0aeKbUF5/'}
                       className={cssCourses.course__block} target="_blank">
                        <img src={course} alt="course"/>
                        <div className={cssCourses.course__title}>
                            Node JS: {EN ? 'Advanced Concepts' : 'Pозширені концепції'}
                        </div>
                        {EN ? <div className={cssCourses.course__description}>
                                Get advanced with Node.Js! Learn caching with Redis, speed up through clustering,
                                and add image upload with S3 and Node! <br/>
                            </div>
                            :
                            <div className={cssCourses.course__description}>
                                Просувайтеся з Node.Js! Навчіться кешувати за допомогою Redis,
                                прискорюйте кластеризацію та додайте завантаження зображень за допомогою S3 і Node!
                            </div>}
                    </a>
                </div>
            </div>
        </div>
    );
};

export {Posts};
