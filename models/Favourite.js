const { Schema, model } = require("mongoose");

const fabSchema = new Schema({
  couch: { type: Schema.Types.ObjectId, ref: "Couch" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  label: String,
  created: {
    type: Date,
    default: new Date(),
  },
});

const FabCouch = model("Fab", fabSchema);

module.exports = FabCouch;