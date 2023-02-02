import Joi from 'joi';

export const vacancyValidator = Joi.object({
    title: Joi
        .string()
        .max(40),
    subtitle: Joi
        .string(),
    companyWebsite: Joi
        .string()
        /*.regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)*/,
    salary: Joi
        .string()

});
