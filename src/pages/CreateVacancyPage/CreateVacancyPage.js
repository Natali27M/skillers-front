import React, {useState, useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';
import css from './CreateVacancyPage.module.css';
import rootCss from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';
import Select from 'react-select';
import {clearBeforeCreate, getTechnologies} from '../../store';
import {experiences, englishLevels} from '../VacanciesPage/constants/vacancies__constants';
import {Helmet} from 'react-helmet-async';
import {useForm} from 'react-hook-form';
import {createVacancy} from '../../store';
import {joiResolver} from '@hookform/resolvers/joi/dist/joi';
import {vacancyValidator} from '../../validation';
import {Navigate} from 'react-router-dom';


const CreateVacancyPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {user} = useSelector(state => state['userReducers']);

    const {technologies} = useSelector(state => state['technologiesReducers']);

    const {status, vacancy} = useSelector(state => state['vacancyReducers']);

    const [vacancyDescription, setVacancyDescription] = useState('**Hello!!!**');

    const [descError, setDescError] = useState(false);

    const [technology, setTechnology] = useState([]);

    const [techError, setTechError] = useState(false);

    const [experience, setExperience] = useState();

    const [expError, setExpError] = useState(false);

    const [englishLevel, setEnglishLevel] = useState();

    const [engError, setEngError] = useState(false);

    const [redirectId, setRedirectId] = useState(null);

    const dispatch = useDispatch();

    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(vacancyValidator)});

    const technologiesArray = (array) => {
        let vacancyTechnologies = [];
        for (const element of array) {
            const find = technologies.data.find(value => value.attributes.value === element.value);
            vacancyTechnologies.push(find);
        }
        setTechnology(vacancyTechnologies);
    };

    useEffect(() => {
        dispatch(getTechnologies());
        dispatch(clearBeforeCreate());
    }, []);


    useEffect(() => {
        if (status === 'fulfilled' && vacancy?.data?.id) {
            setRedirectId(vacancy?.data?.id);
        }
    }, [status, vacancy]);

    const style = {
        control: base => ({
            ...base,
            border: '1px solid #cccccc',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid #cccccc',
            }
        })
    };

    const sendVacancy = (obj) => {
        let flag = 0;

        if (!experience) {
            setExpError(true);
            flag = 1;
        } else {
            setTechError(false);
        }
        if (!englishLevel) {
            setEngError(true);
            flag = 1;
        } else {
            setTechError(false);
        }
        if (!technology?.length) {
            setTechError(true);
            flag = 1;
        } else {
            setTechError(false);
        }
        if (vacancyDescription === '') {
            setDescError(true);
            flag = 1;
        } else {
            setDescError(false);
        }

        if (flag === 1) {
            return window.scrollTo({top: 0, behavior: 'smooth'});
        }


        const vacancyData = {
            ...obj,
            employerId: user.id,
            experience: experience.label,
            englishLevel: englishLevel.value,
            technologies: technology,
            description: vacancyDescription
        };
        dispatch(createVacancy(vacancyData));
        reset();

        setDescError(false);
        setTechError(false);
        setEngError(false);
        setExpError(false);
    };

    const title = 'Create vacancy';
    const description = 'Create a vacancy and find the specialist you need';
    const url = `https://skilliant.net/create-vacancy`;

    if (redirectId) {
        return <Navigate to={`/vacancy/${redirectId}`} replace/>;
    }

    return (
        <div className={css.create__vacancy_page}>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={url}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="skilliant.net"/>
                <title>{title}</title>
                <link rel="canonical" href={url}/>
            </Helmet>
            <div className={css.create__vacancy_wrap}>
                <div className={rootCss.default__title_34}>
                    {EN ? 'Create vacancy' : 'Створити вакансію'}
                </div>
                <form onSubmit={handleSubmit(sendVacancy)} className={css.create__vacancy_form}>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Enter vacancy title' : 'Введіть заголовок вакансії'}</h4>
                            {errors?.title &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field, max: 30' : 'Це обов\'язкове поле, максимум: 30'}
                                </h6>
                            }
                        </div>
                        <input
                            placeholder={EN ? 'Title' : 'Заголовок'}
                            type="text"
                            className={css.create__vacancy_input}
                            {...register('title')}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Enter vacancy subtitle' : 'Введіть підзаголовок вакансії'}</h4>
                            {errors?.subtitle &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field' : 'Це обов\'язкове поле'}
                                </h6>
                            }
                        </div>
                        <input
                            placeholder={EN ? 'Subtitle' : 'Підзаголовок'}
                            type="text"
                            className={css.create__vacancy_input}
                            {...register('subtitle')}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Enter company website url' : 'Введіть посилання на сайт компанії'}</h4>

                            {errors?.companyWebsite &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field, example: https://skilliant.net' : 'Це обов\'язкове поле, приклад: https://skilliant.net'}
                                </h6>
                            }
                        </div>
                        <input
                            placeholder={EN ? 'Company website' : 'Сайт компанії'}
                            type="text"
                            className={css.create__vacancy_input}
                            {...register('companyWebsite')}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Enter salary' : 'Введіть зарплату'}</h4>

                            {errors?.salary &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field' : 'Це обов\'язкове поле'}
                                </h6>
                            }
                        </div>
                        <input
                            placeholder={EN ? 'Salary' : 'Зарплата'}
                            type="text"
                            className={css.create__vacancy_input}
                            {...register('salary')}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Select a technology: ' : 'Виберіть технологію: '}</h4>
                            {techError &&
                                <h6 className={css.error}>
                                    {EN ? 'Choose at least one technology' : 'Виберіть хоча б одну технологію'}
                                </h6>
                            }
                        </div>
                        <Select options={technologies?.data?.map(value => value.attributes)}
                                onChange={technologiesArray}
                                isMulti
                                styles={style}
                                placeholder={EN ? 'Technology' : 'Виберіть технологію'}
                                className={css.create__vacancy_select}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Select experience: ' : 'Виберіть досвід: '}</h4>
                            {expError &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field' : 'Це обов\'язкове поле'}
                                </h6>
                            }
                        </div>
                        <Select options={experiences} onChange={setExperience}
                                placeholder={EN ? 'Experience' : 'Досвід роботи'}
                                styles={style}
                                className={css.create__vacancy_select}/>
                    </div>
                    <div className={css.select__wrap}>

                        <div className={css.select__title}>
                            <h4>{EN ? 'Select english level: ' : 'Виберіть рівень англійської: '}</h4>
                            {engError &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field' : 'Це обов\'язкове поле'}
                                </h6>
                            }
                        </div>
                        <Select options={englishLevels} onChange={setEnglishLevel}
                                placeholder={EN ? 'English level' : 'Рівень англійської'}
                                styles={style}
                                className={css.create__vacancy_select}/>
                    </div>
                    <div className={css.select__wrap}>
                        <div className={css.select__title}>
                            <h4>{EN ? 'Write description: ' : 'Напишіть опис: '}</h4>
                            {descError &&
                                <h6 className={css.error}>
                                    {EN ? 'This is required field' : 'Це обов\'язкове поле'}
                                </h6>
                            }
                        </div>
                        <div className={css.create__vacancy_editor}>
                            <MDEditor
                                value={vacancyDescription}
                                onChange={setVacancyDescription}
                                height={400}
                            />
                        </div>
                    </div>
                    <button className={rootCss.default__button}>{EN ? 'Create' : 'Створити'}</button>
                </form>
            </div>
        </div>
    );
};

export {CreateVacancyPage};
