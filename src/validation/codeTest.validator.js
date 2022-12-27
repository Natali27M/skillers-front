import Joi from 'joi';

export const CodeTestValidator = Joi.object({
    name:
        Joi.string()
            .min(3)
            .max(35),
    difficult:
        Joi.number()
            .min(1)
            .max(10),
    description:
        Joi.string()
            .min(10)
            .max(350),
    input:
        Joi.string()
            .max(350)
            .optional()
            .allow(null, ''),
    outputResult:
        Joi.string()
            .max(350)
            .optional()
            .allow(null, ''),
    codeFragment:
        Joi.string()
            .max(600)
            .optional()
            .allow(null, ''),
    isPrivate:
        Joi.boolean(),
    timeSeconds:
        Joi.number()
            .min(1)
            .max(100000)
            .optional(),
});
