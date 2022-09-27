const mongoose = require('mongoose');
const validator = require('validator');
// const { IncorrectEmailPassword, EnterEmail } = require('../utils/constants');

const clientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email); // если не почта, вернётся false
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String, // имя — это строка
    required: true,
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('client', clientSchema);
