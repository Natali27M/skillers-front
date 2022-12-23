import {useState} from 'react';
import {useSelector} from 'react-redux';

import {LearningPlanList} from '../../components';
import {
    CPLUSPLUS,
    CSHARP,
    HTML,
    JAVA,
    JAVASCRIPT,
    MANAGEMENT,
    PYTHON,
} from '../../constants/learningPlan/categories';
import {categoriesId} from '../../constants/learningPlan/categoriesId';

import rootCSS from '../../styles/root.module.css';
import css from './LearningPlanPage.module.css';

import js from '../../images/learningCategories/js.svg';
import python from '../../images/learningCategories/python.svg';
import java from '../../images/learningCategories/java.svg';
import cPlus from '../../images/learningCategories/c_plus_plus.svg';
import cSharp from '../../images/learningCategories/c_sharp.svg';
import html from '../../images/learningCategories/html5.svg';
import management from '../../images/learningCategories/management.svg';

const categories = [
    {id: categoriesId[JAVASCRIPT], name: 'Javascript', icon: js},
    {id: categoriesId[PYTHON], name: 'Python', icon: python},
    {id: categoriesId[CPLUSPLUS], name: 'C++', icon: cPlus},
    {id: categoriesId[JAVA], name: 'Java', icon: java},
    {id: categoriesId[CSHARP], name: 'C#', icon: cSharp},
    {id: categoriesId[HTML], name: 'HTML', icon: html},
    {id: categoriesId[MANAGEMENT], name: 'Management', icon: management},
];

const LearningPlanPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const [planId, setPlanId] = useState(null);

    const title = EN ?
        'Choose the direction of study and we will show you how to achieve success step by step'
        :
        'Обирайте напрямок навчання і ми підкажемо, як крок за кроком досягти успіху';

    const handleCategory = (categoryId) => {
        setPlanId(categoryId);
    }

    return (
        <div className={css.root}>
            <div className={rootCSS.root__background}></div>
            <div className={css.wrapper}>
                <h3 className={css.header}>{title}</h3>
                <div className={css.categorySelector}>
                    {
                        categories.map((category, index) => (
                            <div
                                className={`${css.categoryBlock} ${category.id === planId ? css.selected : ''}`}
                                key={index}
                                onClick={() => handleCategory(category.id)}
                            >
                                <img src={category.icon} alt={category.name}/>
                            </div>
                        ))
                    }
                </div>
                <div className={css.list}>
                    <LearningPlanList planId={planId}/>
                </div>
            </div>
        </div>
    );
}

export {LearningPlanPage};
