const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  getUser(req, res) {
    User.find()
      .then(async (user) => {
        return res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
// Delete a user 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>{
        if (!user){
           res.status(404).json({ message: 'No such user exists' })
        }

    })
      .then(() =>
           res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//   Post an update to user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      {$set: req.body},
      {runValidators:true, new:true}
      )
      .then((user) =>{
        if (!user){
           return res.status(404).json({ message: 'No such user with that id' })
        }
        res.json(user)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};