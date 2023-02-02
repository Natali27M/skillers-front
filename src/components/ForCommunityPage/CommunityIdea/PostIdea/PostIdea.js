import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Select from "react-select";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";

import css_helper from '../../CommunityQuestion/Questions/Questions.module.css';
import css_post from '../../CommunityQuestion/AskQuestion/AskQuestion.module.css';
import css from './PostIdea.module.css';

import {createIdea, getAllCategories, getTechnologies, updateIdea} from "../../../../store";
import {postsServices} from "../../../../services/posts.services";
import {postIdeaValidator} from "../../../../validation/postIdea.validator";


const PostIdea = () => {
    const {EN} = useSelector(state => state['languageReducers']);
    const {user} = useSelector(state => state['userReducers']);
    const {categories} = useSelector(state => state['categoriesReducers']);
    const {technologies} = useSelector(state => state['technologiesReducers']);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {handleSubmit, register, reset, formState: {errors}} = useForm({resolver: joiResolver(postIdeaValidator)});

    const [technology, setTechnology] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (!categories?.data?.length) {
            dispatch(getAllCategories())
        }
        if (!technologies?.data?.length) {
            dispatch(getTechnologies())
        }
    }, [])

    const technologiesArray = (array) => {
        let ideaTechnologies = [];
        for (const element of array) {
            const find = technologies.data.find(value => value.attributes.value === element.value);
            ideaTechnologies.push(find);
        }
        setTechnology(ideaTechnologies);
    }
    const categoryArray = (array) => {
        let ideaCategories = [];
        for (const element of array) {
            const find = categories.data.find(value => value.attributes.value === element.value);
            ideaCategories.push(find);
        }
        setCategory(ideaCategories);
    }

    const createMyIdea = async (idea) => {
        return dispatch(createIdea(idea));
    }

    const createIdeaPost = async (myIdea) => {
        const idea = JSON.parse(localStorage.getItem('idea'));
        if (idea.id) {
            const post = {
                userId: user.id,
                post: {
                    ...myIdea,
                    type: "idea",
                    id: idea?.id,
                }

            }
            const {data} = await postsServices.createPost({...post});
            dispatch(updateIdea({ideaId: idea.id, postId: data?.id}));
        }
        return localStorage.removeItem('idea');
    }


    const postMyIdea = async (formData) => {
        const idea = {
            ...formData,
            userId: user?.id,
            userName: user?.username,
            technologies: technology,
            categories: category,
        }
        await createMyIdea(idea);
        await createIdeaPost(idea);

        reset();
        return navigate('/community/idea');
    }

    if (!user) {
        return navigate('/login');
    }

    return (
        <div className={css_helper.container}>
            <div className={css_helper.questions__container}>
                <div className={css.idea__sure__info__block__main}>
                    <div className={css.idea__sure__info__block}>
                        <h3>
                            {EN ? "Community Ideas is a forum where you can post your ideas for different categories, directions and for different technologies." :
                                "Community Ideas це міце де ви можете постити свої ідеї для різних категорій, напрямків та за різними технологіями."}
                        </h3>
                        <div>
                            <ul>
                                <h4>{EN ? "Follow these steps to write you idea:" : "Дотримуйтесь наступних кроків написання вашої ідеї:"}</h4>
                                <li>{EN ? "Title - summarize your idea" : "Title - узагальніть вашу ідею"}</li>
                                <li>{EN ? "Description - describe the main points of your idea in a few sentences" : "Description -опишіть головні тези вашої ідеї у декілької реченнях"}</li>
                                <li>{EN ? "Details - a place where you can describe your idea in detail" : "Details - місце де ви можете детально описати вашу ідею"}</li>
                                <li>{EN ? "Code - the technical minded may need to write code, will do so here" : "Code - у технічних ідей може бути потреба вписати код, зробить це тут"}</li>
                                <li>{EN ? "Select technology - mark one about several technologies" : "Select technology - позначте одну обо декілька технологій "}</li>
                                <li>{EN ? "Select categories - mark one about several categories" : "Select categories - позначте одну обо декілька категорій "}</li>
                                <li>{EN ? "Conclusion - a place to write a short conclusion" : "Conclusion - місце написання короткого висновку"}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={css_post.form__block__main}>
                    <div className={css_post.write_you_question}>
                        {EN ? "Write your idea" : "Напишіть вашу ідею"}
                    </div>
                    <form onSubmit={handleSubmit(postMyIdea)} className={css_post.form}>
                        <div className={css_post.form_sub_block}>
                            <h4>Title</h4>
                            <div>
                                {EN ? "Summarize your idea" : "Узагальніть вашу ідею"}
                            </div>
                            <input
                                type="text"
                                placeholder='Title'
                                className={errors.title && css_post.errorFeld}
                                {...register('title')}
                            />
                            {errors.title &&
                                <div className={css_post.error}>
                                    {EN ? "The title can not be a empty" : "Поле Title не може бути пустим"}
                                </div>
                            }
                        </div>

                        <div className={css_post.form_sub_block}>
                            <h4>Description</h4>
                            <div className={css_post.input_description}>
                                {EN ? "Describe the main points of your idea in a few sentences" :
                                    "Опишіть головні тези вашої ідеї у декілької реченнях"}
                            </div>
                            <textarea
                                placeholder='Description'
                                className={errors.description && css_post.errorFeld}
                                {...register('description')}
                            />
                            {errors.description &&
                                <div className={css_post.error}>
                                    {EN ? "The minimum allowable number of characters is 40" : "Мінімальна допустима кількість символів – 40"}
                                </div>
                            }
                        </div>

                        <div className={css_post.form_sub_block}>
                            <h4>Details</h4>
                            <div className={css_post.input_description}>
                                {EN ? "Details is a place where you can describe your idea in detail" :
                                    "Деталі місце де ви можете детально описати вашу ідею"}
                            </div>
                            <textarea
                                placeholder='Details'
                                className={errors.details && css_post.errorFeld}
                                {...register('details')}
                            />
                            {errors.details &&
                                <div className={css_post.error}>
                                    {EN ? "The minimum allowable number of characters is 40" : "Мінімальна допустима кількість символів – 40"}
                                </div>
                            }
                        </div>

                        <div className={css_post.form_sub_block}>
                            <h4>Code</h4>
                            <div className={css_post.input_description}>
                                {EN ? "The technical minded may need to write code, will do so here" :
                                    "У технічних ідей може бути потреба вписати код, зробить це тут"}
                            </div>
                            <textarea
                                placeholder='Code'
                                {...register('code')}
                            />
                        </div>


                        <div className={css_post.form_sub_block}>
                            <h4>Select technology</h4>
                            <div className={css_post.input_description}>
                                {EN ? "Mark one about several technologies" :
                                    "Позначте одну обо декілька технологій "}
                            </div>

                            <Select options={technologies?.data?.map(value => value.attributes)}
                                    onChange={technologiesArray}
                                    isMulti
                                    placeholder={EN ? "Technology" : "Виберіть технологію"}
                                    className={css_post.select__input}/>
                        </div>

                        <div className={css_post.form_sub_block}>
                            <h4>Select category</h4>
                            <div className={css_post.input_description}>
                                {EN ? "Mark one about several technologies" :
                                    "Позначте одну обо декілька технологій "}
                            </div>

                            <Select options={categories?.data?.map(value => value.attributes)}
                                    onChange={categoryArray}
                                    isMulti
                                    placeholder={EN ? "Category" : "Виберіть категорію"}
                                    className={css_post.select__input}/>
                        </div>


                        <div className={css_post.form_sub_block}>
                            <h4>Conclusion</h4>
                            <div className={css_post.input_description}>
                                {EN ? "A place to write a short conclusion" :
                                    "Місце написання короткого висновку"}
                            </div>

                            <textarea
                                placeholder='Conclusion'
                                className={errors.conclusion && css_post.errorFeld}
                                {...register('conclusion')}
                            />
                            {errors.conclusion &&
                                <div className={css_post.error}>
                                    {EN ? "The minimum allowable number of characters is 10" : "Мінімальна допустима кількість символів – 10"}
                                </div>
                            }
                        </div>

                        <div className={css_post.button_div}>
                            <button
                                className={css_helper.ask__button}>{EN ? "Share my idea" : "Поширити мою ідею"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export {PostIdea};
