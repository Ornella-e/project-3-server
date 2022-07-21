const { Schema, model } = require("mongoose");

const rentingTimeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required:true},
    startingDate: {type: Date, required:true},
    endingDate: {type: Date, required:true},
    couch: { type: Schema.Types.ObjectId, ref: "Couch", required:true},
  });

  const Ranking = model("RentingTime", rentingTimeSchema);

module.exports = RentingTime;