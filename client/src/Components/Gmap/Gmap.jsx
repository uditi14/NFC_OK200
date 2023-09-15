import React, {useCallback,useEffect,useState } from 'react'
import { GoogleMap,useLoadScript,Marker,Autocomplete} from '@react-google-maps/api'
import '../../App.css'

export default function Gmap() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey:'AIzaSyBfGckgSJfuIJSjlqh02W1KFs6l4DqR7Sk',
  })

  const [userLocation,setUserLocation]=useState({lat:19.0759837,lng:72.8776559})

  return (
    <>
    {isLoaded?(<div>
        <GoogleMap zoom={15} center={userLocation} mapContainerClassName='map-container'>
        </GoogleMap>
    </div>):(<div>Loading</div>)}
    </>
  )
}
