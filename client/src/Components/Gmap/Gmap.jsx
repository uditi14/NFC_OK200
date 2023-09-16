import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  TrafficLayer,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];
export default function Gmap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk",
    libraries: libraries,
  });

  const [userLocation, setUserLocation] = useState({
    lat: 19.0759837,
    lng: 72.8776559,
  });
  const [directions, setDirections] = useState(null);

  const source = {
    lat: car.sourceCoord.latitude,
    lng: car.sourceCoord.longitude,
  };
  const destination = {
    lat: car.destCoord.latitude,
    lng: car.destCoord.longitude,
  };

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true, // Request alternative routes
          avoidTolls: false,
          avoidHighways: false,
          optimizeWaypoints: true,
          drivingOptions: {
            departureTime: new Date(), // Use current time for real-time traffic
            trafficModel: "bestguess", // Use "bestguess" to consider traffic congestion
          },
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [isLoaded, source, destination]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <GoogleMap
            zoom={15}
            center={userLocation}
            mapContainerClassName="map-container"
          >
            <TrafficLayer></TrafficLayer>
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "blue",
                  },
                }}
              />
            )}
            <Marker position={source} label="Source" />
            <Marker position={destination} label="Destination" />
          </GoogleMap>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
