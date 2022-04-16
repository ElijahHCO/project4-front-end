import { useState, useEffect } from 'react';
import NewSnowboardComponent from './NewSnowComponent.jsx/NewSnowComponent';
import SingleSnowboardComponent from './SingleSnowComponent.jsx/SingleSnowComponent';

const SnowboardContainer = () => {
    const [snows, setSnows] = useState([])
    const [newSnowServerError, setNewSnowServerError] = useState("")
    const [locations, setLocations] = useState([])
    const getLocations = async () => {
        try {
            const locations = await fetch('https://obscure-caverns-42640.herokuapp.com/locations/')
            const parsedLocations = await locations.json();
            setLocations(parsedLocations)
            console.log(parsedLocations)
        } catch (err) {
            console.log(err)
        }
    }
    const createNewSnow = async (newSnow) => {
        try{
            const apiResponse = await fetch("https://obscure-caverns-42640.herokuapp.com/equipment/", {
                method: "POST",
                body: JSON.stringify(newSnow),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            const newSnows = parsedResponse
            if (apiResponse.ok === true) {
                setSnows([newSnows, ...snows])
                console.log(snows)
            } else {
                setNewSnowServerError(parsedResponse)
                console.log(parsedResponse)
            }
        }catch(err){
          console.log(err.message)
        }
    }
    const deleteSnows = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`https://obscure-caverns-42640.herokuapp.com/equipment/${idToDelete}`, {
                method: "DELETE"
            })
            if (apiResponse.ok === true) {
                const newSnows = snows.filter(snows => snows.id !== idToDelete)
                setSnows(newSnows)
            } else {
               
            }
        } catch (err) {
           console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
    }
    const getSnows = async () => {
        try {
            const snows = await fetch('https://obscure-caverns-42640.herokuapp.com/equipment/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedSnows = await snows.json();
            const filteredSnows = parsedSnows.filter(item => item.type == "Snowboard")
            setSnows(filteredSnows)
        } catch (err) {
            
        }
    }
    const updateSnow = async (idToUpdate ,snowsToUpdate) => {
        try{
            const apiResponse = await fetch(`https://obscure-caverns-42640.herokuapp.com/equipment/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(snowsToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if(apiResponse.ok === true){
                const newSnows = snows.map(snows => snows.id === idToUpdate ? snowsToUpdate : snows)
                setSnows(newSnows)
            }else{
        
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getSnows();
        getLocations();
    }, [])
    return (
        <div key={"key"}>
            <h2 className="header-two">Equipment</h2>
            <div className="display-div">
            <NewSnowboardComponent
                newSnowServerError={newSnowServerError}
                createNewSnow={createNewSnow} locations={locations}></NewSnowboardComponent>
            {snows.map((snows) => {
                return <SingleSnowboardComponent key={snows.id} snows={snows} deleteSnows={deleteSnows} updateSnow={updateSnow}></SingleSnowboardComponent>
            })}
            </div>
        </div>
    )
}

export default SnowboardContainer;