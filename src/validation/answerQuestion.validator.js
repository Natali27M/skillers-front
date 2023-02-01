import Joi from "joi";

export const answerQuestionValidator = Joi.object({
    answer: Joi.string()
        .min(1)
        .required(),

    code: Joi.optional()
});
