import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import css from './ForUserPage.module.css';
import rootCSS from '../../styles/root.module.css'

import resume from '../../images/useful_links/resume.io.png';
import djini from '../../images/useful_links/djini.png';
import dou from '../../images/useful_links/dou.png';
import justjoint from '../../images/useful_links/justjoint.png';
import refractoring from '../../images/useful_links/refractoring.png'
import js from '../../images/useful_links/js.png'
import pm from '../../images/useful_links/pm.png';
import tm from '../../images/useful_links/tm.png';
import course from '../../images/useful_links/course.png';
import telegram from '../../images/useful_links/telegram.png';
import codechef from '../../images/useful_links/codechef.jpg';
import coderbyte from '../../images/useful_links/coderbyte.png';
import cppbuzz from '../../images/useful_links/cppbuzz.png'
import examveda from '../../images/useful_links/examveda.png';
import excercism from '../../images/useful_links/excercism.png';
import freecdcmp from '../../images/useful_links/freecodecamp_icon.png';
import geeksof from '../../images/useful_links/geeksofgeekgs.png';
import grasshopper from '../../images/useful_links/grasshopper.png';
import hackerEarth from '../../images/useful_links/HackerEarth_logo.png';
import hackerRank from '../../images/useful_links/HackerRank.png';
import indiabix from '../../images/useful_links/indiabix.png';
import javatpoint from '../../images/useful_links/javatpoint.jpg';
import leetcode from '../../images/useful_links/leetcode.jpg';
import progHub from '../../images/useful_links/prog_hub.jpg';
import programiz from '../../images/useful_links/programiz.jpg';
import sanfoundry from '../../images/useful_links/sanfoundry-logo.webp';
import sololearn from '../../images/useful_links/sololearn.webp';
import studyTonight from '../../images/useful_links/study-tonight.png';
import topCoder from '../../images/useful_links/topcoder.png';
import tutorPoint from '../../images/useful_links/tutor-point.png';
import w3School from '../../images/useful_links/w3school.png';
import boston from '../../images/rec_channels/boston.jpg';
import clever from '../../images/rec_channels/clever.jpg';
import codecamp from '../../images/rec_channels/codecamp.jpg';
import derek from '../../images/rec_channels/derek.jpg';
import harry from '../../images/rec_channels/harry.jpg';
import learncodeacad from '../../images/rec_channels/learncodeacad.jpg';
import mosh from '../../images/rec_channels/mosh.jpg';
import mycodeschool from '../../images/rec_channels/mycodeschool.jpg';
import progknoledge from '../../images/rec_channels/progknoledge.jpg';
import traversy from '../../images/rec_channels/traversy.jpg';

const usefulLinks = [
    {href: 'https://resume.io/', src: resume, title: 'Resume'},
    {href: 'https://djinni.co/', src: djini, title: 'Djini'},
    {href: 'https://dou.ua/', src: dou, title: 'Dou'},
    {href: 'https://justjoin.it/', src: justjoint, title: 'Justjoin'},
    {href: 'https://refactoring.guru/', src: refractoring, title: 'Refactoring.guru'},
    {href: 'https://learnjavascript.online/app.html?id=1436', src: js, title: 'Learnjavascript.online'},
    {href: 'https://www.programiz.com/', src: programiz, title: 'Programiz'},
    {href: 'https://www.tutorialspoint.com/', src: tutorPoint, title: 'Tutorialspoint'},
    {href: 'https://www.freecodecamp.org/', src: freecdcmp, title: 'Freecodecamp'},
    {href: 'https://www.w3schools.com/', src: w3School, title: 'W3School'},
    {href: 'https://www.studytonight.com/', src: studyTonight, title: 'Studytonight'},
    {href: 'https://www.javatpoint.com/', src: javatpoint, title: 'Javapoint'},
    {href: 'https://www.sololearn.com/', src: sololearn, title: 'Sololearn'},
    {href: 'https://programminghub.io/', src: progHub, title: 'ProgrammingHub'},
    {href: 'https://grasshopper.app/', src: grasshopper, title: 'Grasshopper'},
    {href: 'https://www.hackerrank.com/', src: hackerRank, title: 'HackerRank'},
    {href: 'https://www.topcoder.com/', src: topCoder, title: 'TopCoder'},
    {href: 'https://www.codechef.com/', src: codechef, title: 'Codechef'},
    {href: 'https://coderbyte.com/', src: coderbyte, title: 'Coderbyte'},
    {href: 'https://leetcode.com/', src: leetcode, title: 'Leetcode'},
    {href: 'https://www.hackerearth.com/', src: hackerEarth, title: 'HackerEarth'},
    {href: 'https://exercism.org/', src: excercism, title: 'Exercism'},
    {href: 'https://www.geeksforgeeks.org/', src: geeksof, title: 'Geeksforgeeks'},
    {href: 'https://www.examveda.com/', src: examveda, title: 'Examveda'},
    {href: 'https://www.cppbuzz.com/', src: cppbuzz, title: 'Cppbuzz'},
    {href: 'https://www.sanfoundry.com/', src: sanfoundry, title: 'Sanfoundry'},
    {href: 'https://www.indiabix.com/', src: indiabix, title: 'Indiabix'},
];

const recommendedChannels = [
    {href: 'https://www.youtube.com/@programmingwithmosh', src: mosh, title: '@programmingwithmosh'},
    {href: 'https://www.youtube.com/@CodeWithHarry', src: harry, title: '@CodeWithHarry'},
    {href: 'https://www.youtube.com/@CleverProgrammer', src: clever, title: '@CleverProgrammer'},
    {href: 'https://www.youtube.com/@freecodecamp', src: codecamp, title: '@freecodecamp'},
    {href: 'https://www.youtube.com/@TraversyMedia', src: traversy, title: '@TraversyMedia'},
    {href: 'https://www.youtube.com/@derekbanas', src: derek, title: '@derekbanas'},
    {href: 'https://www.youtube.com/@thenewboston', src: boston, title: '@thenewboston'},
    {href: 'https://www.youtube.com/@learncodeacademy', src: learncodeacad, title: '@learncodeacademy'},
    {href: 'https://www.youtube.com/@mycodeschool', src: mycodeschool, title: '@mycodeschool'},
    {href: 'https://www.youtube.com/@ProgrammingKnowledge', src: progknoledge, title: '@ProgrammingKnowledge'},
];

const ForUserPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    return (
        <div className={css.forUser__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.forUser__wrap}>
                <div className={css.forUser__title}>
                    {EN ? 'For users' : 'Користувачам'}
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Support the project' : 'Підтримати проект'}
                </div>
                <div className={css.toMain__btn_wrap}>
                    <Link to={'/donation'} className={rootCSS.default__button}>
                        {EN ? 'Donate' : 'Донатити'}
                    </Link>
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Telegram chat for mentoring' : 'Телеграм чат для менторингу'}
                </div>
                <div className={css.toMain__btn_wrap}>
                    <a href="https://t.me/skilliant" target="_blank" className={css.useful__link}>
                        <img src={telegram} alt="t.me/skilliant"/>
                        <div>
                            https://t.me/skilliant
                        </div>
                    </a>
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Useful links' : 'Корисні посилання'}
                </div>
                <div className={css.links__wrap}>
                    {
                        usefulLinks.map(({href, src, title}, i) => (
                            <a
                                href={href}
                                target="_blank"
                                className={css.useful__link}
                                key={i}
                            >
                                <img src={src} alt={title}/>
                                <div>
                                    {title}
                                </div>
                            </a>)
                        )
                    }
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Recommended YT Channels' : 'Рекомендовані Ю Туб канали'}
                </div>
                <div className={css.links__wrap}>
                    {
                        recommendedChannels.map(({href, src, title}, i) => (
                            <a
                                href={href}
                                target="_blank"
                                className={css.useful__link}
                                key={i}
                            >
                                <img className={css.youtubeImg} src={src} alt={title}/>
                                <div>
                                    {title}
                                </div>
                            </a>)
                        )
                    }
                </div>
                <div className={rootCSS.default__title_24}>
                    {EN ? 'Recommended courses ' : 'Рекомендовані курси'}
                </div>
                <div className={css.courses__wrap}>
                    <a href={'https://www.udemy.com/course/software-project-management-max'}
                       className={css.course__block} target="_blank">
                        <img src={pm} alt="pm"/>
                        <div className={css.course__title}>
                            IT Project Management
                        </div>
                        {EN ? <div className={css.course__description}>
                                Gain creative problem-solving skills and easy-to-use tools. This course is designed
                                with a minimum entry threshold, even if you have no previous experience <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={css.course__description}>
                                Отримайте творчі навички вирішення проблем і прості у використанні інструменти. Цей курс
                                розроблено з мінімальним порогом вступу, навіть якщо у вас немає попереднього досвіду
                            </div>}
                    </a>
                    <a href={'https://www.udemy.com/course/text-mining-max'}
                       className={css.course__block} target="_blank">
                        <img src={tm} alt="tm"/>
                        <div className={css.course__title}>
                            Text Mining. {EN ? 'Fundamentals and applied problems' : 'Основи та прикладні задачі'}
                        </div>
                        {EN ? <div className={css.course__description}>
                                The course of text analysis and text classification, different approaches and variations of
                                methods of working with large masses are considered <br/>
                                Temporarily only in Ukrainian
                            </div>
                            :
                            <div className={css.course__description}>
                                Розглянуто курс аналізу тексту та класифікації тексту, різні підходи та варіації методів
                                роботи з великими масами
                            </div>}
                    </a>
                    <a href={'https://www.udemy.com/share/101WFu3@mX-E6oR_Mt252y6Lw8Mj-xH-wwsIDa4nPKunEpdNI8UkOeKvJiPA09kV0aeKbUF5/'}
                       className={css.course__block} target="_blank">
                        <img src={course} alt="course"/>
                        <div className={css.course__title}>
                            Node JS: {EN ? 'Advanced Concepts' : 'Pозширені концепції'}
                        </div>
                        {EN ? <div className={css.course__description}>
                                Get advanced with Node.Js! Learn caching with Redis, speed up through clustering,
                                and add image upload with S3 and Node! <br/>
                            </div>
                            :
                            <div className={css.course__description}>
                                Просувайтеся з Node.Js! Навчіться кешувати за допомогою Redis,
                                прискорюйте кластеризацію та додайте завантаження зображень за допомогою S3 і Node!
                            </div>}
                    </a>
                </div>
                <div className={css.toMain__btn_wrap}>
                    <Link to={'/'} className={rootCSS.default__button}>
                        {EN ? 'To main' : 'На головну'}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export {ForUserPage};
