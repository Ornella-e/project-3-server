const { Schema, model } = require("mongoose");
const fileUploader = require('../config/cloudinary.config');

const couchSchema = new Schema(
  {
    owner: {
      type : Schema.Types.ObjectId,
      ref: 'User'
    },
    title:{
      type:String
    },
    description:{
      type:String
    },
  
    image:{
      type:String
    },
  
   location:{
      city :String,
      country: String
   },
    evaluations:[{
      type: Schema.Types.ObjectId,
      ref: "Ranking",
      default:[]
    }],
    calendar: [{
      type: Schema.Types.ObjectId,
      ref: "RentingTime",
      default:[]
    }],
},
  {
    timestamps: true,
  }
);

const Couch = model("Couch", couchSchema);

module.exports = Couch;