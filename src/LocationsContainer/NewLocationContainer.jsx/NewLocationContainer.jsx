import React, { useState } from "react";

const NewLocationComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [newLocation, setNewLocation] = useState({
        name: "",
        address: "",
    })
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setNewLocation({
            ...newLocation,
            [e.target.name]: e.target.value
        })
    }
    const submitNewLocation = (e) => {
        e.preventDefault()
        let validSubmission = true;
        if (newLocation.name.length < 2) {
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            })
            validSubmission = false;
        }
        if (validSubmission) {
            props.createNewLocation(newLocation)
            setNewLocation({
                name: "",
                address: "",
            })
            setIsValidState({
                valid: true,
                message: ""
            })
            setShowing(false)
        }
    }

    return (
        <>
            {
                showing
                    ?
                    <div id="new-item-form">
                        <div className="btn-div">
                            <button className="x-btn" onClick={toggleShowing}>X</button>
                        </div>
                        <form className="form" onSubmit={submitNewLocation}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            {props.NewItemServerError ? <p className="form-error">{props.newItemServerError}</p> : null}
                            City: <input onChange={handleInputChange} type="text" name="name" value={newLocation.name} />
                            Address: <input onChange={handleInputChange} type="text" name="address" value={newLocation.address} />
                            <button className="delete-edit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                    :

                    <button onClick={toggleShowing} className="add-equip-btn">Add Location</button>
            }
            
        </>
    )
}

export default NewLocationComponent
