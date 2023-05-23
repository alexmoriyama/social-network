const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Username is required",
    },

    email: {
      type: String,
      unique: true,
      required: "Username is required",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const user = model("user", userSchema);

module.exports = user;