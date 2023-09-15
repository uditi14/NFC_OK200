
import React from 'react';
import './CarCard.css'

const CarCard = ({ car }) => {
  return (
    <div class="container">
        <div class="col1">
            <h2>Car Model: </h2>
            <h3>Source: </h3>
            <h3>Date: </h3>
            <h3>Seats Available: </h3>
        </div>
        <div class="col2">
            <h2>Car No:</h2>
            <h3>Destination:</h3>
            <h3>Time: </h3>
            <h3>Total Amount:</h3>
        </div>
        <div class="col3">
            <button type="button" id="book">Book Now</button>
        </div> 
    </div>
  );
}

export default CarCard;

