import Joi from "joi";

export const createQuestionValidator = Joi.object({
    title: Joi.string()
        .min(1)
        .max(400)
        .message('Title must not be empty'),

    description: Joi.string()
        .min(40)
        .message('The minimum allowable number of characters is 40'),

    details: Joi.string()
        .min(40)
        .message('The minimum allowable number of characters is 40'),

    expected_result: Joi.string()
        .min(1)
        .message('The expected result can not be a empty'),
});
