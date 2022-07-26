const { Schema, model } = require("mongoose");

const couchSchema = new Schema(
  {
    owner: {
      type : Schema.Types.ObjectId,
      ref: 'User'
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
    evaluations:{
      type: Schema.Types.ObjectId,
      ref: "Evaluations"
    },
    calendar:{
      type: Schema.Types.ObjectId,
      ref: "Calendar"
    },
},
  {
    timestamps: true,
  }
);

const Couch = model("Couch", couchSchema);

module.exports = Couch;