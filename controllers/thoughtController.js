const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  getThought(req, res) {
    Thought.find()
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(thought)
      )
      .catch((thought) => res.status(500).json(err));
  },
// Delete a thought 
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>{
        if (!thought){
           res.status(404).json({ message: 'No such thought with this ID' })
        }

    })
      .then(() =>
           res.json({ message: 'thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//   Post an update to thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$set: req.body},
        {runValidators:true, new:true}
        )
      .then((thought) =>{
        if (!thought){
           return res.status(404).json({ message: 'No such thought with that id' })
        }
        res.json(thought)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions:{reactionId:req.params.reactionId}} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: {reactions:req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};


