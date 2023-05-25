const router = require('express').Router();
const thoughtRoutes = require('./thoughtroutes');
const userRoutes = require('./userroutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
