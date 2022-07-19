const { Schema, model } = require("mongoose");

const rankingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required:true},
    evaluation: { type: String, maxlength: 200, required:true}
   
  });

  const Ranking = model("Ranking", rankingSchema);

module.exports = Ranking;