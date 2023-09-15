import axios from "axios";
import React, { useState } from "react";
import { Autocomplete, useLoadScript, GoogleMap } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import haversine from "haversine";

const libraries = ["places"];

const UserPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk",
    libraries: libraries,
  });
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    date: "",
    weight: "",
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

  const handleWeightChange = (event) => {
    setFormData({
      ...formData,
      weight: event.target.value,
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
  //kartik soneji wala
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sourceAdd = await geocodeByAddress(formData.source);
      const destAdd = await geocodeByAddress(formData.destination);
      if (sourceAdd && sourceAdd.length > 0 && destAdd && destAdd.length > 0) {
        const sourceCoord = await getLatLng(sourceAdd[0]);
        console.log("Source Coordinates:", sourceCoord);

        const destCoord = await getLatLng(destAdd[0]);
        console.log("Destination Coordinates:", destCoord);
        const response = await axios.get("http://localhost:3001/api/car/cars", {
          params: {
            date: formData.date,
            time: formData.time,
          },
        });

        console.log(response.data);

        if (response.status === 200) {
          const data = response.data;

          const userSource = {
            latitude: sourceCoord.lat,
            longitude: sourceCoord.lng,
          };
          const userDestination = {
            latitude: destCoord.lat,
            longitude: destCoord.lng,
          };
          // Filtered cars within 500m and calculate ourDistance for each car
          const carsWithDistance = data
            // .filter((car) => {
            //   console.log(car.destCoord.latitude + "  carsss");
            //   if (car.sourceCoord && car.destCoord) {
            //     const carSLocation = {
            //       latitude: car.sourceCoord.latitude,
            //       longitude: car.sourceCoord.longitude,
            //     };
            //     const carDLocation = {
            //       latitude: car.destCoord.latitude,
            //       longitude:car.destCoord.longitude,
            //     }

            //     const distanceToSource = haversine(userSource, carSLocation, {
            //       unit: "meter",
            //     });
            //     console.log(distanceToSource + " dd");
            //     const limitS = distanceToSource * formData.weight;
            //     console.log(limitS + " limit s");
            //     // const sdistanceAfterWeight = distanceToSource * formData.weight;

            //     const distanceToDestination = haversine(
            //       userDestination,
            //       carDLocation,
            //       {
            //         unit: "meter",
            //       }
            //     );
            //     // const limitD = distanceToDestination * (1 - formData.weight);

            //     // const ourDistance = limitS + limitD;
            //     // const ddistanceAfterWeight =
            //     //   distanceToSource * (1 - formData.weight);

            //     return distanceToSource;
            //   } else {
            //     return false;
            //   }
            // })
            .map((car) => {
              // Define ourDistance within this scope
              const carSLocation = {
                latitude: car.sourceCoord.latitude,
                longitude: car.sourceCoord.longitude,
              };

              const carDLocation = {
                latitude: car.destCoord.latitude,
                longitude: car.destCoord.longitude,
              };

              // console.log(carLocation.latitude + " ");

              const distanceToSource = haversine(userSource, carSLocation, {
                unit: "meter",
              });
              const limitS = distanceToSource * formData.weight;

              const distanceToDestination = haversine(
                userDestination,
                carDLocation,
                {
                  unit: "meter",
                }
              );
              const limitD = distanceToDestination * (1-formData.weight);
              const ourDistance = limitS + limitD;
              // const ddistanceAfterWeight =
              //   distanceToSource * (1 - formData.weight);

              return {
                carData: car,
                ourDistance: ourDistance,
              };
            });

          carsWithDistance.sort((a, b) => a.ourDistance - b.ourDistance);

          // Now carsWithDistance is an array of car objects sorted by ourDistance
          console.log(carsWithDistance);
          // Display the sorted cars
          carsWithDistance.map((carObj) => {
            const car = carObj.carData;
            const ourDistance = carObj.ourDistance;

            // Display car information and ourDistance
            console.log("Car:", car);
            console.log("Our Distance:", ourDistance);
          });

          console.log("Cars within 500m:", carsWithDistance);
        } else {
          console.log("Request failed.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //yaha khatam soneji wala

  // apna wala

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
            Enter the approx wait (0 for minimum wait , 1 for max ):
            <input
              type="number"
              name="weight "
              value={formData.weight}
              onChange={handleWeightChange}
            />
          </label>
          <label>Enter Source:</label>
          {isLoaded && (
            <Autocomplete>
              <input
                type="text"
                placeholder="Thane"
                value={formData.source}
                onChange={handleSourceChange}
                required
              />
            </Autocomplete>
          )}

          <label>Enter Destination:</label>
          {isLoaded && (
            <Autocomplete>
              <input
                type="text"
                placeholder="Bandra"
                value={formData.destination}
                onChange={handleDestinationChange}
                required
              />
            </Autocomplete>
          )}

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
