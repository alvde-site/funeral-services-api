const { celebrate, Joi } = require('celebrate');

// Валидация /signup роута

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидация /signin роута

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидация /moveis роута

const validatePostClientsRouter = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    status: Joi.string(),
    description: Joi.string(),
  }),
});

const validateDeleteClient = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateUpdateClient = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    status: Joi.string(),
    description: Joi.string(),
  }),
});

// Валидация /users роута

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validatePostClientsRouter,
  validateDeleteClient,
  validateUpdateClient,
  validationUpdateUser,
};
