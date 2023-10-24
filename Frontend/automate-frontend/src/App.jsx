import { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

import SiginIn from './Signin';
import Landing from './Landing';
// import Login from './extra_pages/Login'
import Navbar from './components/NavBar';

import Dashboard from './components/Dashboard';

const containerStyle = {
  width: "400px",
  height: "400px",
};

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY


  const [userLocation, setUserLocation] = useState(null);
  const [user, setUser] = useState()
  const [isLoggedIn, setLoggedIn] = useState(false);


  const mapOptions = {
    zoom: 15,
  };

  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    // Check for geolocation permission when the component mounts
    checkLocationPermission();

    // Add an event listener to update the permission status when it changes
    const permissionChangeListener = () => {
      checkLocationPermission();
    };

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      result.onchange = permissionChangeListener;
    });

    return () => {
      // Cleanup by removing the event listener
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = null;
      });
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      if (locationPermission == 'denied') {
        alert('why u deny');
      }
      console.log('prompt shown');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('prompt accepted');
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

      });

    }
  }, [locationPermission]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);
      setUser(loggedInUser);
    }
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { state } = await navigator.permissions.query({ name: 'geolocation' });

      if (state === 'granted') {
        setLocationPermission('granted');
      } else if (state === 'prompt') {
        setLocationPermission('prompt');
      } else {
        setLocationPermission('denied');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  console.log('in app', isLoggedIn);

  return (
    <>


      {user ? <Dashboard /> : <Landing />}


      {/* <Navbar isLoggedIn={isLoggedIn} /> */}

      {/* <SiginIn /> */}

      {/* <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={mapOptions.zoom} >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript> */}


      {/* <DemoCreateAccount /> */}

    </>
  );
}

export default App
