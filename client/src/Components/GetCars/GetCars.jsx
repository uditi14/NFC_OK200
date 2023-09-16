import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../GetCars/GetCars.css";
import "../../App.css";

const UserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    date: "",
    source: "",
    destination: "",
  });

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleTimeChange = (event) => {
    setFormData({
      ...formData,
      time: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      date: event.target.value,
    });
  };

  const handleDestinationChange = (event) => {
    setFormData({
      ...formData,
      destination: event.target.value,
    });
  };

  const handleSourceChange = (event) => {
    setFormData({
      ...formData,
      source: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3001/api/car/cars", {
        params: {
          date: formData.date,
          time: formData.time,
        },
      });

      console.log(response.data);

      if (response.status === 200) {
        const data = response.data;
        console.log("OK200 " + JSON.stringify(data));
      } else {
        console.log("Request failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="book_nav"><Navbar/></div>
      <div className="container">
        <form>
          <div className="input">
          <label>Enter Your Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>  

          <div className="input">
          <label>Enter the Time:</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleTimeChange}
            />
          </div>

          <div className="input">
            <label>Enter the Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </div>

          <div className="input">
          <label>Enter Source:</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleSourceChange}
            />
          </div>

          <div className="input">
          <label>Enter Destination:</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleDestinationChange}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
