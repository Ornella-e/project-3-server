const { Schema, model } = require("mongoose");

const rankingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required:true},
    evaluation: { type: String, maxLength: 200, required:true},
    grade: {type: Number, required:true},
    couch: { type: Schema.Types.ObjectId, ref: "Couch", required:true},
  });

  const Ranking = model("Ranking", rankingSchema);

module.exports = Ranking;