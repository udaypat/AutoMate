import { useEffect, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
} from '@react-google-maps/api';

const UserDirections = (props) => {
    const origin = props.loc ?? { lat: 0, lng: 0 };

    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(null);
    const [directions, setDirections] = useState(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK') {
            setDirections(response);
            setDistance(response.routes[0].legs[0].distance.text);
        }
    };

    useEffect(() => {

        const destinationCoordinates = { lat: 19.094555321678545, lng: 72.8423284781787 }; // Example: Los Angeles, CA

        setDestination(destinationCoordinates);

    }, []);

    return (
        <>
            {/* <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={origin || destination}
                    zoom={12}
                >
                    {origin && destination && (
                        <DirectionsService
                            options={{
                                destination,
                                origin,
                                travelMode: 'DRIVING', // You can change the travel mode as needed
                            }}
                            callback={directionsCallback}
                        />
                    )}
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{ preserveViewport: true }}
                        />
                    )}
                    {distance && <p>Distance: {distance}</p>}
                </GoogleMap>
            </LoadScript> */}


        </>
    );
};

export default UserDirections;
