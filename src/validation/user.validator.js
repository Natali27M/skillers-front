import Joi from 'joi';

export const UserValidator = Joi.object({
    username:
        Joi.string(),
    email:
        Joi.string()
            .regex(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
            .message('Хибний Email'),
    password:
        Joi.string()
            .regex(new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,20}$'))
            .message('Пароль має бути не коротшим як 6 символів, містити цифри, великі та малі літери'),
    repeatPassword:
        Joi.string()
            .regex(new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,20}$'))
            .message('Пароль має бути не коротшим як 6 символів, містити цифри, великі та малі літери'),
});