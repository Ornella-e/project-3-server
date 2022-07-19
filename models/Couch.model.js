const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true 

  },
},
  {
    description:{
      type:String
    }
  },
  {
    image:{
      type:String
    }
  },
  {
   location:{
      city :String,
      country: String
   } 
  },
  {
    evaluations:{
      type: Schema.Types.ObjectId,
      ref: "Evaluations"
    }
  },
  {
    calendar:{
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;