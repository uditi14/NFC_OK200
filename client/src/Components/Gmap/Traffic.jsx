import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  TrafficLayer,
} from "@react-google-maps/api";


const Gmap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "", // Replace with your actual API key
  });

  const [userLocation, setUserLocation] = useState({
    lat: 19.0759837,
    lng: 72.8776559,
  });
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (isLoaded && !loadError) {
      const directionsService = new window.google.maps.DirectionsService();

      const origin = new window.google.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      const destination = "Kandivali, Mumbai";

      const request = {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      });
    }
  }, [isLoaded, loadError, userLocation]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <GoogleMap
            zoom={15}
            center={userLocation}
            mapContainerClassName="map-container"
          >
            {/* Show traffic layer */}
            <TrafficLayer />

            {directions && (
              <>
                {directions.routes.map((route, index) => (
                  <div key={index}>
                    <DirectionsRenderer
                      directions={directions}
                      routeIndex={index}
                      options={{
                        polylineOptions: {
                          strokeColor: index === 0 ? "blue" : "gray",
                        },
                      }}
                    />
                    {route.legs.map((leg, legIndex) => (
                      <div key={legIndex} className="route-info">
                        <p>Route {index + 1}</p>
                        <p>Distance: {leg.distance.text}</p>
                        <p>Duration: {leg.duration.text}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Gmap;
