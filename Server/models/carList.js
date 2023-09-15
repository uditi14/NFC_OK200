const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const carListSchema = new mongoose.Schema({
  phoneNumber: String,
  numberPlate: String,
  carModel: String,
  carSeats: Number,
  source: String,
  destination: String,
  sourceCoord: coordinateSchema, // Define as subdocument
  destCoord: coordinateSchema, // Define as subdocument
  price: Number,
  date: Date,
  time: String,
});

const carList = mongoose.model("carListData", carListSchema);

module.exports = carList;
