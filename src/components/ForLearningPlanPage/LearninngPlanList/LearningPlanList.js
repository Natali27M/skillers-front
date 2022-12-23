import {useSelector} from 'react-redux';

import {plans} from '../../../constants';

import css from '../../../pages/LearningPlanPage/LearningPlanPage.module.css';
import study from '../../../images/study.svg';

const LearningPlanList = ({planId}) => {
    const {EN} = useSelector(state => state['languageReducers']);
    const currentPlan = plans.filter(plan => plan.id === planId);

    if (currentPlan.length === 0) {
        return (
            <div className={css.placeholder}>
                <img src={study} alt={'Study icon'}/>
            </div>
        );
    }

    const title = EN ? currentPlan[0].nameEN : currentPlan[0].nameUA;

    return (
        <>
            {/*<h1>{title}</h1>*/}
            {
                currentPlan[0].items.map((item, index) => (
                    <div className={css.listItem} key={index}>
                        <div className={css.listItem__number}>
                            {index.toLocaleString(
                                'en-US',
                                {minimumIntegerDigits: 2, useGrouping: false}
                            )}
                        </div>
                        <div className={css.listItem__content}>
                            <div className={css.listItem__content__title}>
                                {(EN ? item.titleEN : item.titleUA).toUpperCase()}
                            </div>
                            <div className={css.listItem__content__body}>{item.bodyEN}</div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export {LearningPlanList};
