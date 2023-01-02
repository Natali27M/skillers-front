import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import css from './RecruiterPage.module.css';
import rootCSS from '../../styles/root.module.css';
import {getUsersByQueryTen, getUsersTen} from '../../store';
import {UserBlock, Pagination} from '../../components';
import pagination from '../../RootFunctions/pagination';
import check from '../../images/check-green.svg';

const RecruiterPage = () => {
    const {EN} = useSelector(state => state['languageReducers']);

    const {roles, usersTen} = useSelector(state => state['userReducers']);

    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    const [isQuery, setIsQuery] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [data, setData] = useState();

    const [emailCopyTime, setEmailCopyTime] = useState(false);

    const [id, setId] = useState(null);

    useEffect(() => {
        if (isQuery === false) {
            dispatch(getUsersTen(currentPage));
        }
    }, [currentPage, isQuery]);

    useEffect(() => {
        if (isQuery === true) {
            dispatch(getUsersByQueryTen({query: data, currentPage}));
        }
    }, [currentPage, isQuery, data]);

    const allPages = usersTen?.meta?.pagination?.pageCount;

    const pagesArray = pagination(allPages, currentPage);

    const handleChange = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setData(e.target.value);
        if (e.target.value === '') {
            setIsQuery(false);
        } else {
            setIsQuery(true);
        }
    };


    if (!(roles?.includes('admin')) && !(roles?.includes('recruiter'))) {
        return <Navigate to={'/user'} replace/>;
    }

    const emailCopy = (user) => {
        setEmailCopyTime(true);
        setId(user?.id);
        navigator.clipboard.writeText(`${user?.email}`);
        setTimeout(() => {
            setEmailCopyTime(false);
        }, 1000);

    };

    return (
        <div className={css.recruiter__page}>
            <div className={rootCSS.root__background}></div>
            <div className={css.recruiter__wrap}>
                <div className={css.user__search_wrap} onClick={() => setUserId(null)}>
                    <form className={css.user__search_form} onSubmit={e => e.preventDefault()}>
                        <input onChange={e => handleChange(e)} className={css.user__search_input} type="text"
                               placeholder={EN ? 'Search users' : 'Знайти користувачів'}/>
                    </form>
                </div>

                <div className={css.users__wrap}>
                    <div className={css.users__header}>
                        <div className={css.user__name_header}>
                            {EN ? 'User' : 'Користувач'}
                        </div>

                        <div className={css.user__openForHiring_header}>
                            Open to work
                        </div>

                        <div className={css.user__email_header}>
                            Email
                        </div>

                        <div className={css.user__linkedin_header}>
                            Linkedin
                        </div>

                        <div className={css.user__github_header}>
                            GitHub
                        </div>
                    </div>
                    {
                        usersTen?.data[0].map(user =>
                            <div className={css.user__block_main} key={user?.id}>
                                <div className={css.user__block}
                                     onClick={() => setUserId(user?.id)}
                                >
                                    <div className={css.user__name}>{user?.username}</div>
                                    {user?.openForHiring ?
                                        <div className={css.user__openForHiring_img}>
                                            <img src={check} alt="true"/>
                                        </div>
                                        :
                                        <div className={css.user__openForHiring}></div>
                                    }

                                </div>

                                <div onClick={() => emailCopy(user)} className={css.user__email}>
                                    {emailCopyTime && id === user?.id &&
                                        <div className={css.email__btn}>{EN ? 'Copied to clipboard' : 'Скопійовано'}</div>
                                    }

                                    {emailCopyTime && id !== user?.id &&
                                        <div className={css.email__btn}>Email</div>
                                    }

                                    {!emailCopyTime &&
                                        <div className={css.email__btn}>Email</div>
                                    }
                                </div>

                                <div className={css.user__linkedin}>
                                    {user?.linkedin ?
                                        <a href={user?.linkedin} target="_blank" className={css.linkedin__btn}>
                                            LinkedIn
                                        </a>
                                        :
                                        <div></div>
                                    }
                                </div>

                                <div className={css.user__github}>
                                    {user?.github ?
                                        <a href={user?.github} target="_blank" className={css.github__btn}>
                                            Github
                                        </a>
                                        :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        )
                    }
                    {userId && <UserBlock key={userId} userId={userId} setUserId={setUserId}/>}
                </div>

                {usersTen?.data?.length ?
                    ''
                    :
                    (EN ? <div>There are no users with this username <span
                                className={css.search__info_span}>!</span></div>
                            :
                            <div>Немає користувачів з таким юзернеймом <span
                                className={css.search__info_span}>!</span></div>
                    )
                }

                <Pagination key={usersTen?.id}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            allPages={allPages}
                            setUserId={setUserId}
                            pagesArray={pagesArray}
                />
            </div>
        </div>
    );
};

export {RecruiterPage};
