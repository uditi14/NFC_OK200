import React from 'react';
import './CarCard.css'

const CarCard = ({ car }) => {
  return (
    <div class="container">
        <div class="col1">
            <h2>Car Model: WagonR</h2>
            <h3>Source: Bandra</h3>
            <h3>Date: 10-09-2023</h3>
            <h3>Seats Available: 3</h3>
        </div>
        <div class="col2">
            <h2>Car No: 4567</h2>
            <h3>Destination: Kandivali</h3>
            <h3>Time: 7:30</h3>
            <h3>Total Amount: 600</h3>
        </div>
        <div class="col3">
            <button type="button" id="book">Book Now</button>
        </div> 
    </div>
  );
}

export default CarCard;

