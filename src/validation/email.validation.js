import Joi from 'joi';

export const emailValidation = Joi.object({
    email:
        Joi.string()
            .regex(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
            .message('Хибний Email'),
});
