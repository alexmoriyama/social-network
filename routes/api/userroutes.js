const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/students/:studentId/assignments
// router.route('/:userId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/api/users/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
