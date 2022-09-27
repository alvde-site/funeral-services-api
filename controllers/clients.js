const bcrypt = require('bcrypt'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-error');
const {
  NotFoundUser,
  EditProfileError,
  IncorrectUserData,
  UsedEmail,
  SecretKey,
  IncorrectLoginPassword,
  DeletedToken,
  SomethingWrong,
} = require('../utils/constants');

module.exports.getCurrentClient = (req, res, next) => {
  Client.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundUser);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NotFoundUser));
      } else {
        next(err);
      }
    });
};

module.exports.updateClient = (req, res, next) => {
  const { name, email } = req.body;
  // обновим имя найденного по _id пользователя
  Client.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(EditProfileError));
      } else {
        next(err);
      }
    });
};

module.exports.createClient = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(IncorrectUserData));
      } else if (err.code === 11000) {
        next(new ConflictError(UsedEmail));
      } else {
        next(err);
      }
    });
};

module.exports.deleteClient = (req, res, next) => {
  const { id } = req.params;
  Client.findById(id)
    .orFail(() => new NotFoundError(NotFoundMovie))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(ForbiddenDeleteMovie));
      }
      return movie.remove().then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NotFoundMovie));
      } else {
        next(err);
      }
    });
};