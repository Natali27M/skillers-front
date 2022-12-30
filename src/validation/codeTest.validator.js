import Joi from 'joi';

export const CodeTestValidator = Joi.object({
    testName:
        Joi.string()
            .min(3)
            .max(50),
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
    hours:
        Joi.number()
            .min(0)
            .max(20)
            .allow(null, ''),
    minutes:
        Joi.number()
            .min(0)
            .max(60)
            .allow(null, ''),
    seconds:
        Joi.number()
            .min(0)
            .max(60)
            .allow(null, ''),
});
