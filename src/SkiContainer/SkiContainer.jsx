import { useState, useEffect } from 'react';
import NewSkiComponent from './NewSkiComponent.jsx/NewSkiComponent';
import SingleSkiComponent from './SingleSkiComponent.jsx/SingleSkiComponent';

const SkiContainer = () => {
    const [skis, setSkis] = useState([])
    const [newSkiServerError, setNewSkiServerError] = useState("")
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
    const createNewSki = async (newSki) => {
        try{
            const apiResponse = await fetch("https://obscure-caverns-42640.herokuapp.com/equipment/", {
                method: "POST",
                body: JSON.stringify(newSki),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            const newSkis = parsedResponse
            if (apiResponse.ok === true) {
                setSkis([newSkis, ...skis])
            } else {
                setNewSkiServerError(parsedResponse)
                console.log(parsedResponse)
            }
        }catch(err){
          console.log(err.message)
        }
    }
    const deleteSkis = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`https://obscure-caverns-42640.herokuapp.com/equipment/${idToDelete}`, {
                method: "DELETE"
            })
            if (apiResponse.ok === true) {
                const newSkis = skis.filter(skis => skis.id !== idToDelete)
                setSkis(newSkis)
            } else {
               
            }
        } catch (err) {
           console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
    }
    const getSkis = async () => {
        try {
            const skis = await fetch('https://obscure-caverns-42640.herokuapp.com/equipment/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedSkis = await skis.json();
            console.log(parsedSkis)
            const filteredSkis = parsedSkis.filter(item => item.type == "Ski")
            setSkis(filteredSkis)
        } catch (err) {
            
        }
    }
    const updateSki = async (idToUpdate ,skisToUpdate) => {
        try{
            const apiResponse = await fetch(`https://obscure-caverns-42640.herokuapp.com/equipment/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(skisToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if(apiResponse.ok === true){
                const newSkis = skis.map(skis => skis.id === idToUpdate ? skisToUpdate : skis)
                setSkis(newSkis)
            }else{
        
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getSkis();
        getLocations();
    }, [])
    return (
        <div key={"key"}>
            <h2 className="header-two">Equipment</h2>
            <div className="display-div">
            <NewSkiComponent
                newSkiServerError={newSkiServerError}
                createNewSki={createNewSki} locations={locations}></NewSkiComponent>
            {skis.map((skis) => {
                return <SingleSkiComponent key={skis.id} skis={skis} deleteSkis={deleteSkis} updateSki={updateSki}></SingleSkiComponent>
            })}
            </div>
        </div>
    )
}

export default SkiContainer;