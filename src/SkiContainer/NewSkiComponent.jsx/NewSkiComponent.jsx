import React, { useState } from "react";

const NewSkiComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [newSki, setNewSki] = useState({
        type: "Ski",
        brand: "",
        model: "",
        quantity: 0,
        rented: 0,
        location: ""
    })
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setNewSki({
            ...newSki,
            [e.target.name]: e.target.value
        })
    }
    const submitNewSki = (e) => {
        e.preventDefault()
        props.createNewSki(newSki)
        setNewSki({
            type: "Ski",
            brand: "",
            model: "",
            quantity: 0,
            rented: 0,
            location: ""
        })
        setIsValidState({
            valid: true,
            message: ""
        })
        setShowing(false)
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
                        <form className="form" onSubmit={(e) => submitNewSki(e)}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            {props.NewItemServerError ? <p className="form-error">{props.newItemServerError}</p> : null}
                            Brand: <input onChange={handleInputChange} required min="2" type="text" name="brand" value={newSki.brand} />
                            Model: <input onChange={handleInputChange} required min="2" type="text" name="model" value={newSki.model} />
                            Quantity: <input onChange={handleInputChange} required type="number" name="quantity" value={newSki.quantity} />
                            Location: <select onChange={handleInputChange} type="number" name="location" value={newSki.location}>
                                <option></option> {props.locations.map((location)=>{
                                    return <option
                                    key={location.name}
                                    value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                })
                            }
                                </select>
                            <button className="delete-edit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                    :
                    <button onClick={toggleShowing} className="add-equip-btn">Add Equipment</button>
            }
        </>
    )
}

export default NewSkiComponent
