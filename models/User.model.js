const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true 
    },
    email: String,
    password: String, 
  
    userImage: {
      type: String,
    },
  couch: [{
    type: Schema.Types.ObjectId,
    ref: "Couch"
}],
location: {
  city: String,
  country: String
},
},
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
