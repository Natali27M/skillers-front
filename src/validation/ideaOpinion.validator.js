import Joi from "joi";

export const ideaOpinionValidator = Joi.object({
    comment: Joi.string()
        .min(40)
        .required(),

    code: Joi.optional(),
})
