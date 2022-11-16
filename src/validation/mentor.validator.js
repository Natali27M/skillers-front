import Joi from "joi";

export const MentorValidator = Joi.object({
    userId: Joi.number(),

    userName: Joi.string()
        .min(4)
        .max(16),

    userEmail: Joi.string()
        .regex(
            new RegExp(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        )
        .message("Хибний Email"),

    linkedin: Joi.string()
        .required(),

    coverLetter: Joi.string()
        .max(140),

    englishLevel: Joi.object({
        value: Joi.string(),
        label: Joi.string()
    }),

    experience: Joi.object({
        value: Joi.string(),
        label: Joi.string()
    }),

    technology: Joi.array(),
});
