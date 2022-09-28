const mongoose = require('mongoose');
const validator = require('validator');

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
  phone: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 13,
  },
  status: {
    type: String,
    default: 'Новый клиент',
  },
  description: {
    type: String,
    default: 'Описание',
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('client', clientSchema);
