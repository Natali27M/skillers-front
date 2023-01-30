import Joi from "joi";

export const postIdeaValidator = Joi.object({
    title: Joi.string()
        .required(),

    description: Joi.string()
        .min(40)
        .required(),

    details: Joi.string()
        .min(40)
        .required(),

    code: Joi.optional(),

    conclusion: Joi.string()
        .min(10)
        .required(),
});
