const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CardsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});

module.exports = Cards = mongoose.model("cards", CardsSchema);
