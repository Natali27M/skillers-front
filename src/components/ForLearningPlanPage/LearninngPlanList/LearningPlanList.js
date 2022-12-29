import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';
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

    return (
        <>
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
                            <div className={css.listItem__content__body}>
                                <h4>{(EN ? item.titleEN : item.titleUA).toUpperCase()}</h4>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {EN ? item.bodyEN : item.bodyUA}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export {LearningPlanList};
