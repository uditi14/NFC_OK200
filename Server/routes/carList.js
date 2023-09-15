const express = require('express');
const router = express.Router();
const carList = require('../models/carList');
const axios =require("axios")

router.post("/list", async (req, res) => {
    try { 
      const newCar = new carList({
        phoneNumber: req.body.phoneNumber,
        numberPlate: req.body.numberPlate,
        carModel: req.body.carModel,
        carSeats: req.body.carSeats,
        source: req.body.source,
        destination: req.body.destination,
        sourceCoord: {
          latitude: req.body.sourceCoord.lat,
          longitude: req.body.sourceCoord.lng,
        },
        destCoord: {
          latitude: req.body.destCoord.lat,
          longitude: req.body.destCoord.lng,
        },
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
      });
      
      await newCar.save();
    //   res.send("Car data saved successfully");
    res.status(200).json(newCar);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error saving car data");
    }
  });

  router.get("/cars", async (req, res) => {
    try {
      const date = req.query.date;
      const time = req.query.time;
      const carLists = await carList.find({ date: date, time: time });
      res.status(200).json(carLists);
    } catch (e) {
      console.log(e + " error");
      res.status(500).send("Error fetching car data");
    }
  });
  module.exports=router;