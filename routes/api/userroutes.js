const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;
