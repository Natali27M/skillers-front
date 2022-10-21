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
            .max(10),
    correctPercent:
        Joi.number()
            .min(10)
            .max(100)
            .optional(),
    isPrivate:
        Joi.boolean()
});