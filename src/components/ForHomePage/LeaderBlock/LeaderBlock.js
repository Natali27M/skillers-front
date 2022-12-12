import React, {useEffect, useState} from 'react';
import css from '../LeaderBord/LeaderBord.module.css';
import Lamer from '../../../images/rank_little/Lamer.png';
import Trainee from '../../../images/rank_little/Trainee.png';
import Junior from '../../../images/rank_little/Junior.png';
import Middle from '../../../images/rank_little/Middle.png';
import Senior from '../../../images/rank_little/Senior.png';
import {Link} from 'react-router-dom';
import getBadgesForLeader from '../../../RootFunctions/getBadgesForLeader';
import {BadgeMini} from '../BadgeMini/BadgeMini';

const LeaderBlock = ({leader, position, setLeaderModal}) => {
    const [leaderBadges, setLeaderBadges] = useState(null);

    useEffect(() => {
        if (leader?.id) {
            getBadgesForLeader(leader?.attributes?.userId).then(value => {
                let startArray = value;
                if (startArray.length > 3) {
                    startArray = startArray.slice(0, 3);
                    setLeaderBadges(startArray)
                } else {
                    setLeaderBadges(value);
                }
            });
        }
    }, [leader?.id]);


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
        <div onClick={() => setLeaderModal({...leader, rank: rank})}
             className={position <= 3 ? css.payment__leader_block : css.leader__block}>
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
            <div className={css.leader__rank}>
                {leaderBadges?.map(badge => <BadgeMini key={badge?.techId} badge={badge}/>)}
            </div>

        </div>
    );
};

export {LeaderBlock};