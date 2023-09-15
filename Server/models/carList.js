const mongoose = require("mongoose");

const carListSchema = new mongoose.Schema({
    phoneNumber: String,
    numberPlate: String,
    carModel: String,
    carSeats: Number,
    source: String,
    destination: String,
    price: Number,
    date: Date,
    time: String,
  });
const carList = mongoose.model("carListData", carListSchema);

module.exports = carList;