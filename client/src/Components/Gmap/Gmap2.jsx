import React, { useEffect, useState } from "react";
import myMarker from "../../assets/marker.png";
import {
  GoogleMap,
  useLoadScript,
    Marker,
    DirectionsRenderer,
    DirectionsService,
  TrafficLayer
} from "@react-google-maps/api";
import "./Gmap.css";

const libraries = ["places"];

export default function Gmap({ carS, carD, src, dest }) {
    // const src={lat:19.0760, lng:72.8777}
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk", // Replace with your API key
    libraries: libraries,
  });
    
    const [directions, setDirections] = useState(null);

    const directionsCallback = (response, status) => {
      if (status === "OK") {
        setDirections(response);
      } else {
        console.error("Directions request failed with status:", status);
      }
    };

    useEffect(() => {
      if (isLoaded) {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: src, // Replace with the source location (e.g., { lat: 19.0759837, lng: 72.8776559 })
            destination: dest, // Replace with the destination location
            travelMode: "DRIVING", // You can change this to other travel modes if needed
            provideRouteAlternatives: true,
          },
          directionsCallback
        );
      }
    }, [isLoaded, src, dest]);

  return (
    <div>
      {loadError ? (
        <div>Error loading Google Maps</div>
      ) : isLoaded ? (
        <div>
          <GoogleMap
            zoom={15}
            center={src}
            mapContainerClassName="map-container"
          >
            {carS.map((car, index) => (
              <Marker
                key={index} // Make sure to use a unique key for each Marker
                position={{ lat: car.latitude, lng: car.longitude }} // Assuming car.latitude and car.longitude are available in your car object
                icon={{
                  url: myMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            {carD.map((car, index) => (
              <Marker
                key={index} // Make sure to use a unique key for each Marker
                position={{ lat: car.latitude, lng: car.longitude }} // Assuming car.latitude and car.longitude are available in your car object
                icon={{
                  url: myMarker,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}

            <TrafficLayer autoUpdate />
            {directions && directions.routes && (
              <div>
                {directions.routes.map((route, index) => (
                  <DirectionsRenderer
                    key={index}
                    directions={directions}
                    routeIndex={index}
                    options={{
                      polylineOptions: {
                        strokeColor: index === 0 ? "blue" : "grey", // Blue for the first (main) route, grey for alternatives
                      },
                    }}
                  />
                ))}
              </div>
            )}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
