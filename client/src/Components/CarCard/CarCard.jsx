import React from 'react';
import './CarCard.css'
import React from "react";
import "./CarCard.css";
import Gmap from "../Gmap/Gmap";

const CarCard = ({ car, ourDistance }) => {
  if (!car || Object.keys(car).length === 0) {
    return <div>No car data available.</div>;
  }

  return (
    <div className="container">
      <div className="col1">
        <h2>Car Model: {car.carModel}</h2>
        <h3>Source: {car.source}</h3>
        <h3>Date: {new Date(car.date).toLocaleDateString()}</h3>
        <h3>Seats Available: {car.carSeats}</h3>
      </div>
      <div className="col2">
        <h2>Car No: {car.numberPlate}</h2>
        <h3>Destination: {car.destination}</h3>
        <h3>Time: {car.time}</h3>
        <h3>Total Amount: {car.price}</h3>
      </div>
      <div className="col3">
        <button type="button" id="book">
          Book Now
        </button>
      </div>
      <div className="col4">
        <h3>Our Distance: {ourDistance.toFixed(2)} meters</h3>
      </div>
    </div>
  );
};

export default CarCard;
