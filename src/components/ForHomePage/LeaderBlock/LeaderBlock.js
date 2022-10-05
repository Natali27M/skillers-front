import React from 'react';
import css from '../LeaderBord/LeaderBord.module.css';
import Lamer from '../../../images/rank_little/Lamer.png';
import Trainee from '../../../images/rank_little/Trainee.png';
import Junior from '../../../images/rank_little/Junior.png';
import Middle from '../../../images/rank_little/Middle.png';
import Senior from '../../../images/rank_little/Senior.png';
import {Link} from 'react-router-dom';

const LeaderBlock = ({leader, position}) => {
    let rank;

    const rating = leader?.attributes?.rating;

    if (rating < 20) {
        rank = 'Lamer';
    } else if (rating >= 20 && rating < 50) {
        rank = 'Trainee';
    } else if (rating >= 50 && rating < 100) {
        rank = 'Junior';
    } else if (rating >= 100 && rating < 200) {
        rank = 'Middle';
    } else if (rating >= 200) {
        rank = 'Senior';
    }

    return (
        <div className={css.leader__block}>
            <div
                className={css.position}>{position}
            </div>
            <div className={css.leader__name}> {leader.attributes.userName}</div>
            <div className={css.leader__rating}>{leader.attributes.rating}</div>
            <div className={css.leader__rank}>
                <Link to={'/rank'}>
                    <img
                        src={rank === 'Lamer' ? Lamer : rank === 'Trainee' ? Trainee
                            :
                            rank === 'Junior' ? Junior : rank === 'Middle' ? Middle : Senior}
                        className={css.rank__img}
                        alt="trainee"
                    />
                </Link>
            </div>

        </div>
    );
};

export {LeaderBlock};