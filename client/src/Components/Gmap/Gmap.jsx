import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  TrafficLayer,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./Gmap.css";

const libraries = ["places"];

export default function Gmap({ source, destination }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7ki",
    libraries: libraries,
  });

  const [directions, setDirections] = useState();

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
          origin: source,
          destination: destination,
          travelMode: "DRIVING",
          provideRouteAlternatives: true,
        },
        directionsCallback
      );
    }
  }, [isLoaded, source, destination]);

  return (
    <div>
      {loadError ? (
        <div>Error loading Google Maps</div>
      ) : isLoaded ? (
        <div>
          <GoogleMap
            zoom={15}
            center={source}
            mapContainerClassName="map-container"
          >
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
