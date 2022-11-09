import Joi from "joi";

export const FeedbackValidator = Joi.object({
    email: Joi.string()
        .regex(
            new RegExp(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        )
        .message("Хибний Email"),
    userName: Joi.string()
        .max(40)
        .message(
            "Пароль має бути не коротшим як 6 символів, містити цифри, великі та малі літери"
        ),
    message: Joi.string()
        .max(258)
        .message(
            "Пароль має бути не коротшим як 6 символів, містити цифри, великі та малі літери"
        ),
});
