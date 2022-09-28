const clientsRouter = require('express').Router();

const {
  getClients,
  createClient,
  deleteClient,
  updateClient,
} = require('../controllers/clients');

const { validatePostClientsRouter, validateDeleteClient, validateUpdateClient } = require('../middlewares/validations');

clientsRouter.get('/', getClients);

clientsRouter.post('/', validatePostClientsRouter, createClient);

clientsRouter.delete('/:id', validateDeleteClient, deleteClient);

clientsRouter.patch('/:id', validateUpdateClient, updateClient);

module.exports = clientsRouter;
