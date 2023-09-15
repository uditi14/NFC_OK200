// import React, {useCallback,useEffect,useState } from 'react'
// import { GoogleMap,useLoadScript,Marker,Autocomplete} from '@react-google-maps/api'
// import '../../App.css'

// export default function Gmap() {
//   const {isLoaded} = useLoadScript({
//     googleMapsApiKey:'AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk',
//   })

//   const [userLocation,setUserLocation]=useState({lat:19.0759837,lng:72.8776559})

//   return (
//     <>
//     {isLoaded?(<div>
//         <GoogleMap zoom={15} center={userLocation} mapContainerClassName='map-container'>
//         </GoogleMap>
//     </div>):(<div>Loading</div>)}
//     </>
//   )
// }

// ******************************************* //
// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// const Gmap = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk", // Replace with your API key
//   });

//   const [userLocation, setUserLocation] = useState({
//     lat: 19.0759837,
//     lng: 72.8776559,
//   });

//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     if (isLoaded && !loadError) {
//       const directionsService = new window.google.maps.DirectionsService();

//       const origin = new window.google.maps.LatLng(
//         userLocation.lat,
//         userLocation.lng
//       );
//       const destination = "Hyderbad, India"; // Replace with the destination address or coordinates

//       const request = {
//         origin: origin,
//         destination: destination,
//         travelMode: "DRIVING", // You can change the mode to 'WALKING', 'TRANSIT', etc.
//         provideRouteAlternatives: true
//       };

//       directionsService.route(request, (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//         } else {
//           console.error("Directions request failed:", status);
//         }
//       });
//     }
//   }, [isLoaded, loadError, userLocation]);

//   return (
//     <div>
//       {isLoaded ? (
//         <div>
//           <GoogleMap zoom={15} center={userLocation} mapContainerClassName='map-container'>
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         </div>
//       ) : (
//         <div>Loading</div>
//       )}
//     </div>
//   );
// };

// export default Gmap;

// **********************************************8

// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// const Gmap = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk", // Replace with your API key
//   });

//   const [userLocation, setUserLocation] = useState({
//     lat: 19.0759837,
//     lng: 72.8776559,
//   });
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     if (isLoaded && !loadError) {
//       const directionsService = new window.google.maps.DirectionsService();

//       const origin = new window.google.maps.LatLng(
//         userLocation.lat,
//         userLocation.lng
//       );
//       const destination = "Vasai, Maharashtra"; // Replace with the destination address or coordinates

//       const request = {
//         origin: origin,
//         destination: destination,
//         travelMode: "DRIVING",// You can change the mode to 'WALKING', 'TRANSIT', etc.
//         provideRouteAlternatives: true, // Request alternate routes
//       };

//       directionsService.route(request, (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//         } else {
//           console.error("Directions request failed:", status);
//         }
//       });
//     }
//   }, [isLoaded, loadError, userLocation]);

//   return (
//     <div>
//       {isLoaded ? (
//         <div>
//           <GoogleMap
//             zoom={15}
//             center={userLocation}
//             mapContainerClassName="map-container"
//     >
//             {directions && (
//               <>
//                 {directions.routes.map((route, index) => (
//                   <DirectionsRenderer
//                     key={index}
//                     directions={directions}
//                     routeIndex={index}
//                     options={{
//                       polylineOptions: {
//                         strokeColor: index === 0 ? "blue" : "gray", // Color the main route blue and alternate routes gray
//                       },
//                     }}
//                   />
//                 ))}
//               </>
//             )}
//           </GoogleMap>
//         </div>
//       ) : (
//         <div>Loading</div>
//       )}
//     </div>
//   );
// };

// export default Gmap;

// *****************************************************************************

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  TrafficLayer, // Add TrafficLayer
} from "@react-google-maps/api";

const Gmap = () => {
  const [dist, setDist] = useState("");
  const [duration, setDuration] = useState("");
  const [dist2, setDist2] = useState("");
  const [duration2, setDuration2] = useState("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk", // Replace with your API key
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
      const destination = "Vasai, Maharashtra"; // Replace with the destination address or coordinates

      const request = {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          const firstRoute = result.routes[0].legs[0].distance.text;
          setDist(firstRoute);
          setDuration(result.routes[0].legs[0].duration.text);
          setDist2(result.routes[1].legs[0].distance.text);
          setDuration2(result.routes[1].legs[0].duration.text);
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
            <TrafficLayer autoUpdate={true} /> {/* Add TrafficLayer */}
            {directions &&
              (console.log(directions),
              (
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
                      const firstRoute = route.legs[0].distance.text;
                      {console.log(route.legs[0].distance.text)}
                      setDist(firstRoute)
                    </div>
                  ))}
                </>
              ))}
          </GoogleMap>
          <div>
            <h6>Best Route (Blue) :-</h6>
            <p>Distance is {dist}</p>
            <p>Duration is {duration}</p>
            <h6>Alternate Route (Grey) :-</h6>
            <p>Distance:- {dist2}</p>
            <p>Duration:- {duration2}</p>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Gmap;

// ***************************************************
