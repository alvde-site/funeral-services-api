const router = require('express').Router();
const authRouter = require('./authentication');
const usersRouter = require('./users');
const clientsRouter = require('./clients');
const { createClient } = require('../controllers/clients');
const auth = require('../middlewares/auth');
const { signout } = require('../controllers/users');
const { sendMsg } = require('../controllers/telegramMsg');

router.use('/', authRouter);
router.use('/telegram', sendMsg);
router.use('/feedback', createClient);
router.use('/', auth);
router.use('/signout', signout);
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);

module.exports = router;
