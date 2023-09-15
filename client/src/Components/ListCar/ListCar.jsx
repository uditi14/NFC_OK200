import React, { useState } from 'react';
import axios from 'axios';
const ListCar = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    numberPlate: "",
    carModel: "",
    carSeats: "",
    source: "",
    destination: "",
    price: "",
    date: "",
    time: "",
  });

  // Define an onChange handler for each input field
  const handlePhoneNumberChange = (event) => {
    setFormData({
      ...formData,
      phoneNumber: event.target.value,
    });
  };

  const handleNumberPlateChange = (event) => {
    setFormData({
      ...formData,
      numberPlate: event.target.value,
    });
  };

  const handleCarModelChange = (event) => {
    setFormData({
      ...formData,
      carModel: event.target.value,
    });
  };

  const handleCarSeatsChange = (event) => {
    setFormData({
      ...formData,
      carSeats: event.target.value,
    });
  };

  const handleSourceChange = (event) => {
    setFormData({
      ...formData,
      source: event.target.value,
    });
  };

  const handleDestinationChange = (event) => {
    setFormData({
      ...formData,
      destination: event.target.value,
    });
  };

  const handlePriceChange = (event) => {
    setFormData({
      ...formData,
      price: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      date: event.target.value,
    });
  };

  const handleTimeChange = (event) => {
    setFormData({
      ...formData,
      time: event.target.value,
    });
    // console.log(formData);
  };


  const handleBack=async ()=>{
    try {
        const response=await axios({
            method:"post",
            url:"http://localhost:3001/api/car/list",
            data:{
                phoneNumber:formData.phoneNumber,
                numberPlate:formData.numberPlate,
                carModel:formData.carModel,
                carSeats:formData.carSeats,
                source:formData.source,
                destination:formData.destination,
                price:formData.price,
                date:formData.date,
                time:formData.time,
            }
        });

        console.log(response.data);
        if (response.status===200) {
            const data=response.data;
            console.log("OK200 "+ data);
        }
        else{
            console.log("ha ha ha ");
        }
        
    } catch (error) {
        console.log(error + " error sending data");
    }
  }


  return (
    <div>
      <label>Enter Phone number:</label>
      <input
        type="text"
        placeholder="+91 8976554321"
        value={formData.phoneNumber}
        onChange={handlePhoneNumberChange}
      />

      <label>Enter Car number:</label>
      <input
        type="text"
        placeholder="MH05-8976"
        value={formData.numberPlate}
        onChange={handleNumberPlateChange}
      />

      <label>Enter Car model:</label>
      <input
        type="text"
        placeholder="i20 Sportz"
        value={formData.carModel}
        onChange={handleCarModelChange}
      />

      <label>Enter number of available seats:</label>
      <input
        type="number"
        placeholder="3"
        value={formData.carSeats}
        onChange={handleCarSeatsChange}
      />

      <label>Enter Source:</label>
      <input
        type="text"
        placeholder="Thane"
        value={formData.source}
        onChange={handleSourceChange}
      />

      <label>Enter Destination:</label>
      <input
        type="text"
        placeholder="Bandra"
        value={formData.destination}
        onChange={handleDestinationChange}
      />

      <label>Enter Price per seat:</label>
      <input
        type="number"
        placeholder="120"
        value={formData.price}
        onChange={handlePriceChange}
      />

      <label>Enter date of travel:</label>
      <input
        type="date"
        placeholder="15-09-23"
        value={formData.date}
        onChange={handleDateChange}
      />

      <label>Enter time of travel:</label>
      <input
        type="time"
        placeholder="09:00AM"
        value={formData.time}
        onChange={handleTimeChange}
      />

      <button onClick={handleBack}>Submit</button>
    </div>
  );
};

export default ListCar;
