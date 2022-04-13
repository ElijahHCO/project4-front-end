import { useState, useEffect } from 'react';
import NewSnowboardComponent from './NewSnowComponent.jsx/NewSnowComponent';
import SingleSnowboardComponent from './SingleSnowComponent.jsx/SingleSnowComponent';

const SnowboardContainer = () => {
    const [snows, setSnows] = useState([])
    const [newSnowServerError, setNewSnowServerError] = useState("")
    const createNewSnow = async (newSnow) => {
        try{
            const apiResponse = await fetch("https://obscure-caverns-42640.herokuapp.com/equipment", {
                method: "POST",
                body: JSON.stringify(newSnow),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            const newSnows = parsedResponse.data
            console.log(parsedResponse)
            if (parsedResponse.success) {
                setSnows([newSnows, ...snows])
                console.log(snows)
            } else {
                setNewSnowServerError(parsedResponse.data)
                console.log(parsedResponse)
            }
        }catch(err){
          console.log(err.message)
        }
    }
    const deleteSnows = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`https://obscure-caverns-42640.herokuapp.com/api/equipment/${idToDelete}`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if (parsedResponse.success) {
                const newSnows = snows.filter(snows => snows._id !== idToDelete)
                setSnows(newSnows)
            } else {
               
            }
            console.log(parsedResponse)
        } catch (err) {
           console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
    }
    const getSnows = async () => {
        try {
            const snows = await fetch('https://obscure-caverns-42640.herokuapp.com/equipment/snowboard', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedSnows = await snows.json();
            console.log(parsedSnows)
            setSnows(parsedSnows.data)
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
            if(parsedResponse.success){
                const newSnows = snows.map(snows => snows._id === idToUpdate ? snowsToUpdate : snows)
                setSnows(newSnows)
            }else{
        
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getSnows()
    }, [])
    return (
        <div key={"key"}>
            <h2 className="header-two">Equipment</h2>
            <div className="display-div">
            <NewSnowboardComponent
                newSnowServerError={newSnowServerError}
                createNewSnow={createNewSnow}></NewSnowboardComponent>
            {snows.map((snows) => {
                return <SingleSnowboardComponent key={snows._id} snows={snows} deleteSnows={deleteSnows} updateSnow={updateSnow}></SingleSnowboardComponent>
            })}
            </div>
        </div>
    )
}

export default SnowboardContainer;