import Joi from 'joi';

export const vacancyValidator = Joi.object({
    title: Joi
        .string()
        .max(40),
    subtitle: Joi
        .string(),
    companyWebsite: Joi
        .string()
        .regex(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/i),
    salary: Joi
        .string()

});
