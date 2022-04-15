import { useState, useEffect } from 'react';
import NewEquipComponent from './NewEquipComponent/NewEquipComponent';
import SingleEquipComponent from './SingleEquipComponent.jsx/SingleEquipComponent';


const EquipmentContainer = () => {
    const [equips, setEquips] = useState([])
    const [locations, setLocations] = useState([])
    const [newEquipServerError, setNewEquipServerError] = useState("")
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
    const createNewEquip = async (newEquip) => {
        try {
            const apiResponse = await fetch("http://obscure-caverns-42640.herokuapp.com/equipment/", {
                method: "POST",
                body: JSON.stringify(newEquip),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json()
            if (apiResponse.ok == true) {
                setEquips([parsedResponse, ...equips])
            } else {
                setNewEquipServerError(parsedResponse)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteEquip = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`http://obscure-caverns-42640.herokuapp.com/equipment/${idToDelete}`, {
                method: "DELETE"
            })
            if (apiResponse.ok === true) {
                const newEquips = equips.filter(equip => equip.id !== idToDelete)
                setEquips(newEquips)
            } else {

            }
        } catch (err) {
            console.log(err)
        }
        console.log("deleting item ID" + idToDelete)
    }
    const getEquips = async () => {
        try {
            const equips = await fetch('http://obscure-caverns-42640.herokuapp.com/equipment/')
            const parsedEquips = await equips.json();
            setEquips(parsedEquips)
        } catch (err) {
            console.log(err)
        }
    }
    const updateEquip = async (idToUpdate, equipToUpdate) => {
        try {
            const apiResponse = await fetch(`http://obscure-caverns-42640.herokuapp.com/equipment/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(equipToUpdate),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (apiResponse.ok === true) {
                const newEquips = equips.map(equip => equip.id === idToUpdate ? equipToUpdate : equip)
                setEquips(newEquips)
            } else {

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getEquips(); getLocations()
    }, [])
    return (
        <div className="container-div">
            <h2 className="header-two">Equipment</h2>
            <div className="display-div">
                <NewEquipComponent
                    newEquipServerError={newEquipServerError}
                    createNewEquip={createNewEquip} locations={locations}></NewEquipComponent>
                {equips.length > 0 ? equips.reverse().map((equip) => {
                    return <SingleEquipComponent key={equip._id} equip={equip} deleteEquip={deleteEquip} updateEquip={updateEquip}></SingleEquipComponent>
                }) : null}
            </div>
        </div>
    )
}


export default EquipmentContainer;