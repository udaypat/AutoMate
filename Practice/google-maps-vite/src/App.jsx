import { useState } from 'react'

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 37.7749, // San Francisco, CA
  lng: -122.4194,
};


function App() {

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBM5t4s4-K5hTOhW60ql7p3tUSyCurudWU">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default App
