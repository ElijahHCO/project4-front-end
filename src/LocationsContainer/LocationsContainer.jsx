import { useState, useEffect } from 'react';
import NewLocationComponent from './NewLocationContainer.jsx/NewLocationContainer';
import SingleLocationComponent from './SingleLocationContainer/SingleLocationContainer';

const LocationsContainer = () => {
    const [locations, setLocations] = useState([])
    const [newLocationServerError, setNewLocationServerError] = useState("")
    const createNewLocation = async (newLocation) => {
        try {
            const apiResponse = await fetch("http://obscure-caverns-42640.herokuapp.com/locations/", {
                method: "POST",
                body: JSON.stringify(newLocation),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            console.log(parsedResponse)
            if (parsedResponse.ok === true) {
                setLocations([parsedResponse, ...locations])
            } else {
                setNewLocationServerError(parsedResponse)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteLocation = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`http://obscure-caverns-42640.herokuapp.com/locations/${idToDelete}`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if (parsedResponse.ok === true) {
                const newLocations = locations.filter(location => location.id !== idToDelete)
                setLocations(newLocations)
            } else {

            }
            console.log(parsedResponse)
        } catch (err) {
            console.log(err)
        }
        console.log("deleting location ID" + idToDelete)
    }
    const getLocations = async () => {
        try {
            const locations = await fetch('http://obscure-caverns-42640.herokuapp.com/locations/')
            const parsedLocations = await locations.json();
            setLocations(parsedLocations)
            console.log(parsedLocations)
        } catch (err) {
            console.log(err)
        }
    }
    const updateLocation = async (idToUpdate, locationToUpdate) => {
        try {
            const apiResponse = await fetch(`http://obscure-caverns-42640.herokuapp.com/locations/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(locationToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse.ok === true) {
                const newLocations = locations.map(location => location.id === idToUpdate ? locationToUpdate : location)
                setLocations(newLocations)
            } else {

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getLocations()
    }, [])
    return (
        <div className="container-div">
            <div className="display-div">
                <NewLocationComponent
                    newLocationServerError={newLocationServerError}
                    createNewLocation={createNewLocation}></NewLocationComponent>
                {locations.length > 0 ? locations.reverse().map((location) => {
                    return <SingleLocationComponent key={location.id} location={location} deleteLocation={deleteLocation} updateLocation={updateLocation}></SingleLocationComponent>
                }) : null}
            </div>
        </div>
    )
}


export default LocationsContainer;