import React, { useState } from "react";

const NewSnowboardComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [newSnow, setNewSnow] = useState({
        type: "Snowboard",
        brand: "",
        model: "",
        quantity: 0,
        rented: 0,
        location: ""
    })
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setNewSnow({
            ...newSnow,
            [e.target.name]: e.target.value
        })
    }
    const submitNewSnow = (e) => {
        e.preventDefault()
        props.createNewSnow(newSnow)
        setNewSnow({
            type: "Snowboard",
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
                        <form className="form" onSubmit={(e)=>submitNewSnow(e)}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            Brand: <input onChange={handleInputChange} required min="2" type="text" name="brand" value={newSnow.brand} />
                            Model: <input onChange={handleInputChange} required min="2" type="text" name="model" value={newSnow.model} />
                            Quantity: <input onChange={handleInputChange} required type="number" name="quantity" value={newSnow.quantity} />
                            Location: <select onChange={handleInputChange} type="number" name="location" value={newSnow.location}>
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

export default NewSnowboardComponent
