
const { Schema, model } = require("mongoose");
const fileUploader = require('../config/cloudinary.config');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    userImage: {
      type: String,
    },
    couch: [
      {
        type: Schema.Types.ObjectId,
        ref: "Couch",
      },
    ],
    location: {
      city: String,
      country: String,
    },
    FabCouches: [{ type: Schema.Types.ObjectId, ref: "FabCouch" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
