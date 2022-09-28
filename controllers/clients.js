const bcrypt = require('bcrypt'); // импортируем bcrypt
const Client = require('../models/client');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-error');
const {
  NotFoundClient,
  EditClientError,
  IncorrectClientData,
  UsedEmail,
} = require('../utils/constants');

module.exports.getClients = (req, res, next) => {
  Client.find({})
    .then((clients) => {
      console.log("Здесь")
      return res.status(200).send(clients)
    })
    .catch((err) => {
      console.log(err);
      return next;
    });
};

module.exports.getCurrentClient = (req, res, next) => {
  Client.findById(req.client._id)
    .then((client) => {
      if (!client) {
        throw new NotFoundError(NotFoundClient);
      } else {
        res.send(client);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NotFoundClient));
      } else {
        next(err);
      }
    });
};

module.exports.updateClient = (req, res, next) => {
  const { name, email } = req.body;
  Client.findByIdAndUpdate(
    req.client._id,
    { name, email },
    {
      new: true, runValidators: true,
    },
  )
    .then((client) => res.send(client))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(EditClientError));
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
    .then((hash) => Client.create({
      name, email, password: hash,
    }))
    .then((client) => res.send({
      name: client.name, email: client.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(IncorrectClientData));
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
    .orFail(() => new NotFoundError(NotFoundClient))
    .then((client) => client.remove().then(() => res.send(client)))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NotFoundClient));
      } else {
        next(err);
      }
    });
};
