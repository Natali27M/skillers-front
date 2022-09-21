import Joi from 'joi';

export const TestNameValidator = Joi.object({
    name:
        Joi.string()
            .min(3)
            .max(35)
            .message('Хибний Email'),
    difficult:
        Joi.number()
            .min(1)
            .max(10)
});