const { Schema, model } = require("mongoose");

const userSchema = new Schema(
{
  username: {
    type: String,
    unique: true 
  }
},
{
  location: {
  city: String,
  country: String
  }
},
{
  description:{
    type: String
  }
},
{
  calender :{
    //change
    type:String
    
  }
},
{
  comments:{
    type: String
  }
},
{
  timestamps: true,
}
);

const User = model("User", userSchema);

module.exports = User;