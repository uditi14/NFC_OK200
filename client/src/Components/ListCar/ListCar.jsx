import React, { useState } from 'react';
import axios from 'axios';
import { Autocomplete,useLoadScript,GoogleMap } from '@react-google-maps/api';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


const libraries=['places'];

const ListCar = () => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey:'AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk',
        libraries: libraries,
    });

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
        if (formData.phoneNumber!=="") {
          const sourceAdd = await geocodeByAddress(formData.source);
          const destAdd= await geocodeByAddress(formData.destination);
          if (sourceAdd && sourceAdd.length > 0 && destAdd && destAdd.length > 0) {
            const sourceCoord = await getLatLng(sourceAdd[0]); // geocodeByAddress returns an array
            console.log("Source Coordinates:", sourceCoord);
          // if (destAdd && destAdd.length > 0) {
            const destCoord = await getLatLng(destAdd[0]); // geocodeByAddress returns an array
            console.log("Destination Coordinates:", destCoord);
        
            const response = await axios({
              method: "post",
              url: "http://localhost:3001/api/car/list",
              data: {
                phoneNumber: formData.phoneNumber,
                numberPlate: formData.numberPlate,
                carModel: formData.carModel,
                carSeats: formData.carSeats,
                source: formData.source,
                destination: formData.destination,
                sourceCoord: sourceCoord, // Use formData.sourceCoord
                destCoord: destCoord,     // Use formData.destCoord
                price: formData.price,
                date: formData.date,
                time: formData.time,
              },
            });
            
      
        console.log(response.data);
        if (response.status===200) {
            const data=response.data;
            console.log("OK200 "+ data);

        }
        else{
            console.log("ha ha ha ");
        }}
    } else {
         alert("Fill all fields");  
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
        required
      />

      <label>Enter Car number:</label>
      <input
        type="text"
        placeholder="MH05-8976"
        value={formData.numberPlate}
        onChange={handleNumberPlateChange}
        required
      />

      <label>Enter Car model:</label>
      <input
        type="text"
        placeholder="i20 Sportz"
        value={formData.carModel}
        onChange={handleCarModelChange}
        required
      />

      <label>Enter number of available seats:</label>
      <input
        type="number"
        placeholder="3"
        value={formData.carSeats}
        onChange={handleCarSeatsChange}
        required
      />

      <label>Enter Source:</label>
     { isLoaded && <Autocomplete>
      <input
        type="text"
        placeholder="Thane"
        value={formData.source}
        onChange={handleSourceChange}
        required
      /></Autocomplete>}

      <label>Enter Destination:</label>
      { isLoaded && <Autocomplete>
      <input
        type="text"
        placeholder="Bandra"
        value={formData.destination}
        onChange={handleDestinationChange}
        required
      /></Autocomplete>}

      <label>Enter Price per seat:</label>
      <input
        type="number"
        placeholder="120"
        value={formData.price}
        onChange={handlePriceChange}
        required
      />

      <label>Enter date of travel:</label>
      <input
        type="date"
        placeholder="15-09-23"
        value={formData.date}
        onChange={handleDateChange}
        required
      />

      <label>Enter time of travel:</label>
      <input
        type="time"
        placeholder="09:00AM"
        value={formData.time}
        onChange={handleTimeChange}
        required
      />

      <button onClick={handleBack}>Submit</button>
    </div>
  );
};

export default ListCar;
