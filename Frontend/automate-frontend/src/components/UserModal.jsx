/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserModal(props) {
    // const [userData, setUserData] = useState(null);
    const [show, setShow] = useState(true);
    const [searching, setSearching] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);

    const [consent, setConsent] = useState(false);
    const [routeLink, setRoutelink] = useState('');



    const token = localStorage.getItem("user");
    const navigate = useNavigate();



    // const [loading, setLoading] = useState(false);


    // const fetchUserDetails = async () => {

    // };



    // const handleNewUser = () => {
    //     setUserData(null);
    //     setLoading(true);
    //     fetchUserDetails();
    // };
    console.log('from user modal', props.userLocation);
    const search = async () => {
        try {

            const postData = {
                loc: props.userLocation,
                dest: props.destination
            };


            const response = await axios.post('http://127.0.0.1:5000/search', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
            });

            if (response.status === 200) {
                const data = response.data;
                // setUserData(data);
                // Move the console.log here to see the updated value of userData.
                console.log(data);
                // setSearching(false);

            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }



    }



    let searchInterval;

    const handleSearch = async () => {

        await search()

        searchInterval = setInterval(async () => {

            try {


                const response = await axios.get('http://127.0.0.1:5000/match', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    // setUserData(data);
                    // Move the console.log here to see the updated value of userData.
                    console.log(data);
                    setSearching(false);
                    clearInterval(searchInterval); // Stop polling when status is 200.
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            // Track the time when the polling started.
            const currentTime = new Date().getTime();
            console.log("time", currentTime - startTime)
            // Check if 2 minutes have passed (120,000 milliseconds).
            if (currentTime - startTime >= 12000) {
                clearInterval(searchInterval); // Clear the interval after 2 minutes.
            }
        }, 4000); // Poll every 4 seconds.

        const startTime = new Date().getTime(); // Record the start time.

        // Clear the interval when your component unmounts to avoid memory leaks.
        return () => clearInterval(searchInterval);
    };





    const handleAccept = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/accepted', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }

            );
            if (response.status === 200) {
                const data = response.data;
                console.log(data);

                alert('accepted');
                setAccepted(true);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }


    const handleClose = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:5000/reject', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }

            );
            if (response.status === 200) {
                const data = response.data;
                console.log(data);

                setSearching(true);
                setAccepted(false);
                setShow(false)
                setConsent(false);
                setRoutelink('');
                clearInterval(searchInterval);
                clearInterval(pollConsent)

                alert('rejected');

            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
        setShow(false);
        navigate('/');
        clearInterval(searchInterval);
        console.log("closed modal");
        props.setopen(false);
    }

    const handleGenerate = async () => {
        try {
            const postData = {
                waypoint: props.userLocation,
                destination: props.destination
            };

            console.log('post', postData);
            const response = await axios.post('http://127.0.0.1:5000/route', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                setRoutelink(response.data)
                alert(response.data)
                console.log(response.data)
            }
        }
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    let pollConsentId

    const pollConsent = () => {
        pollConsentId = setInterval(async () => {
            try {


                const response = await axios.get('http://127.0.0.1:5000/consent', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {


                    setConsent(true)
                    clearInterval(pollConsentId);
                    const data = response.data;

                    console.log(data);
                    setSearching(false);

                } else {
                    console.error('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            // Track the time when the polling started.
            const currentTime = new Date().getTime();

            // Check if 2 minutes have passed (120,000 milliseconds).
            if (currentTime - startTime >= 120000) {
                clearInterval(pollConsentId); // Clear the interval after 2 minutes.
            }
        }, 4000); // Poll every 4 seconds.

        const startTime = new Date().getTime(); // Record the start time.

        // Clear the interval when your component unmounts to avoid memory leaks.
        return () => clearInterval(pollConsentId);
    };



    return (
        <>

            {searching && !accepted ? (

                <Modal show={show} onHide={handleClose} centered onShow={handleSearch} >
                    <Modal.Header closeButton>

                        <Modal.Title>
                            Searching for users

                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>

                        Wait while we search for users

                    </Modal.Body>

                </Modal>) :
                (
                    <Modal show={show} onHide={handleClose}
                        centered
                    >
                        <Modal.Header closeButton>

                            <Modal.Title>
                                We found a Match !
                            </Modal.Title>


                        </Modal.Header>
                        <Modal.Body>

                            Click on accept or reject


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Reject
                            </Button>
                            <Button variant="success" onClick={handleAccept}>
                                Accept
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

            {accepted ? (
                <Modal show={show} onHide={handleClose}
                    centered onShow={pollConsent}
                >
                    <Modal.Header closeButton>

                        <Modal.Title>
                            Waiting
                        </Modal.Title>


                    </Modal.Header>
                    <Modal.Body>

                        Waiting for other user to accept

                    </Modal.Body>
                    {consent ? (<Modal.Footer>
                        {/* <Button variant="danger" onClick={handleClose}>
                            Reject
                        </Button> */}
                        <Button variant="success" onClick={handleGenerate} >
                            Generate
                        </Button>
                    </Modal.Footer>) : null}

                </Modal>
            ) : null}


        </>

        // {searching ? <>Searching for users</> : <>Waiting for users</>}

        // {searching ? <>Wait while we search for users</> : <>Waiting for the other user to accept </>}

        // <div

        //     style={{
        //         boxSizing: `border-box`,
        //         border: `1px solid transparent`,
        //         width: `240px`,
        //         height: `32px`,
        //         padding: `0 12px`,
        //         borderRadius: `3px`,
        //         boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        //         fontSize: `14px`,
        //         outline: `none`,
        //         textOverflow: `ellipsis`,
        //         position: "absolute",
        //         left: "50%",
        //         marginLeft: "-120px"
        //     }}
        // >
        //     {loading ? (
        //         <p>Searching for users...</p>
        //     ) : userData ? (

        //         <div>
        //             <h2>User Details</h2>
        //             <p>Name: {userData.name}</p>
        //             <p>Age: {userData.age}</p>
        //             <button onClick={handleNewUser}>Find New User</button>
        //             <button onClick={handleAcceptUser}>Accept User</button>
        //         </div>

        //     ) : (
        //         <p>No users found</p>
        //     )}
        // </div>
    );
}

export default UserModal;