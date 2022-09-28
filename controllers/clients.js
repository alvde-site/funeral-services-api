const Client = require('../models/client');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  NotFoundClient,
  EditClientError,
  IncorrectClientData,
} = require('../utils/constants');

module.exports.getClients = (req, res, next) => {
  Client.find({})
    .then((clients) => res.status(200).send(clients))
    .catch(next);
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
  const {
    email, phone, status, description,
  } = req.body;
  Client.findByIdAndUpdate(
    req.params.id,
    {
      email, phone, status, description,
    },
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
    phone, email,
  } = req.body;

  Client.create({
    phone, email,
  })
    .then((client) => res.send(client))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(IncorrectClientData));
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
