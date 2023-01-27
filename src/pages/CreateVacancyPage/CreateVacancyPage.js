import React, {useState, useEffect} from 'react';
import MDEditor from '@uiw/react-md-editor';
import css from './CreateVacancyPage.module.css';
import rootCss from '../../styles/root.module.css';
import {useDispatch, useSelector} from 'react-redux';
import Select from 'react-select';
import {getTechnologies} from '../../store';
import {experiences, englishLevels} from '../VacanciesPage/constants/vacancies__constants';


const CreateVacancyPage = () => {
    const [value, setValue] = useState('**Hello world!!!**');

    const {EN} = useSelector(state => state['languageReducers']);
    let {user} = useSelector(state => state['userReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);
    const [technology, setTechnology] = useState([]);
    const [experience, setExperience] = useState();
    const [englishLevel, setEnglishLevel] = useState();

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

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(englishLevel);
    }, [englishLevel]);

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
    }, []);

    return (
        <div className={css.create__vacancy_page}>
            <div className={css.create__vacancy_wrap}>
                <div className={rootCss.default__title_34}>
                    {EN ? 'Create vacancy' : 'Створити вакансію'}
                </div>
                <form className={css.create__vacancy_form}>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Enter vacancy title' : 'Ведіть заголовок вакансії'}</h4>
                        <input placeholder={EN ? 'Title' : 'Заголовок'} type="text"
                               className={css.create__vacancy_input}/>
                    </div>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Enter vacancy subtitle' : 'Ведіть підзаголовок вакансії'}</h4>
                        <input placeholder={EN ? 'Subtitle' : 'Підзаголовок'} type="text"
                               className={css.create__vacancy_input}/>
                    </div>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Select a technology: ' : 'Виберіть технологію: '}</h4>
                        <Select options={technologies?.data?.map(value => value.attributes)}
                                onChange={technologiesArray}
                                isMulti
                                styles={style}
                                placeholder={EN ? 'Technology' : 'Виберіть технологію'}
                                className={css.create__vacancy_select}
                        />
                    </div>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Select experience: ' : 'Виберіть досвід: '}</h4>
                        <Select options={experiences} onChange={setExperience}
                                placeholder={EN ? 'Experience' : 'Досвід роботи'}
                                styles={style}
                                className={css.create__vacancy_select}/>
                    </div>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Select experience: ' : 'Виберіть досвід: '}</h4>
                        <Select options={englishLevels} onChange={setEnglishLevel}
                                placeholder={EN ? 'English level' : 'Рівень англійської'}
                                styles={style}
                                className={css.create__vacancy_select}/>
                    </div>
                    <div className={css.select__wrap}>
                        <h4>{EN ? 'Write description: ' : 'Напишіть опис: '}</h4>
                        <div className={css.create__vacancy_editor}>
                            <MDEditor
                                value={value}
                                onChange={setValue}
                                height={400}
                            />
                        </div>

                    </div>



                </form>


            </div>

        </div>
    );
};

export {CreateVacancyPage};
