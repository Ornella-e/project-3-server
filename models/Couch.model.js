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
   locarion:{
      City :String,
      Country: String
   } 
  },
  {
    evaluations:{
      type: Schema.Types.ObjectId,
      ref: "Evaluations"
    }
  },
  {
    calender:{
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;