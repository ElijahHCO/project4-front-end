import React, { useState } from "react";

const NewEquipComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [newEquip, setNewEquip] = useState({
        type: "",
        brand: "",
        model: "",
        quantity: 0,
    })
    const handleInputChange = (e) => {
        console.log(e.target.value)
        setNewEquip({
            ...newEquip,
            [e.target.name]: e.target.value
        })
    }
    const submitNewEquip = (e) => {
        e.preventDefault()
        let validSubmission = true;
        if (newEquip.brand.length < 2) {
            setIsValidState({
                valid: false,
                message: "Name needs to be longer"
            })
            validSubmission = false;
        }
        if (validSubmission) {
            props.createNewEquip(newEquip)
            setNewEquip({
                type: "",
                brand: "",
                model: "",
                quantity: 0
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
                        <form className="form" onSubmit={submitNewEquip}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            {props.NewItemServerError ? <p className="form-error">{props.newItemServerError}</p> : null}
                            Type: <input onChange={handleInputChange} type="text" name="type" value={newEquip.type} />
                            Brand: <input onChange={handleInputChange} type="text" name="brand" value={newEquip.brand} />
                            Model: <input onChange={handleInputChange} type="text" name="model" value={newEquip.model} />
                            Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={newEquip.quantity} />
                            <button className="delete-edit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                    :

                    <button onClick={toggleShowing} className="add-equip-btn">Add Equipment</button>
            }
                    <h3>All Equipment</h3>
            
        </>
    )
}

export default NewEquipComponent
