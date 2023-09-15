const express = require('express');
const router = express.Router();
const carList = require('../models/carList');

router.post("/list", async (req, res) => {
    try {
      const newCar = new carList({
        phoneNumber: req.body.phoneNumber,
        numberPlate: req.body.numberPlate,
        carModel: req.body.carModel,
        carSeats: req.body.carSeats,
        source: req.body.source,
        destination: req.body.destination,
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

  router.get("/",async(req,res)=>{
  try {
    const {source,destination}=req.body;
    const carLists=carList.find({source:source,destination:destination});
    res.json("success " + carLists);
  } catch (error) {
    res.json(error)
  }
  })

  module.exports=router;