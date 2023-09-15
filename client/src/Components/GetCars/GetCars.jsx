import axios from "axios";
import React, { useState } from "react";

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
      <h1>Enter Pickup Details!</h1>
      <div className="container">
        <form>
          <label>
            Enter Your Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </label>
          <label>
            Enter the Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleTimeChange}
            />
          </label>
          <label>
            Enter the Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </label>
          <label>
            Enter Destination:
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleDestinationChange}
            />
          </label>
          <label>
            Enter Source:
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleSourceChange}
            />
          </label>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
