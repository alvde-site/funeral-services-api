const router = require('express').Router();
const authRouter = require('./authentication');
const usersRouter = require('./users');
const clientsRouter = require('./clients');
const auth = require('../middlewares/auth');
const { signout } = require('../controllers/users');

router.use('/', authRouter);
router.use('/', auth);
router.use('/signout', signout);
router.use('/users', usersRouter);
router.use('/movies', clientsRouter);

module.exports = router;
