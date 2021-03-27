const Joi = require('joi');
const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(24)
        .required(),
    age: Joi.number().integer().min(16).max(120),
    gender: Joi.string().alphanum().min(4).max(6),
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).required(),
    // email: Joi.string().email().required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).required(),
    avatar: Joi.string(),
    docs: Joi.array().items(Joi.object({
        doc: Joi.string()
    })),
    videos: Joi.array().items(Joi.object({
        video: Joi.string()
    }))
});
