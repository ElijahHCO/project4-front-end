import React, { useState } from "react";

const NewSnowboardComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [newSnow, setNewSnow] = useState({
        type: "Snowboard",
        productBrand: "",
        productModel: "",
        quantity: 0,
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
        console.log("working", props.createNewSnow)
        setNewSnow({
            type: "Snowboard",
            productBrand: "",
            productModel: "",
            quantity: 0
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
                            Brand: <input onChange={handleInputChange} required min="2" type="text" name="productBrand" value={newSnow.productBrand} />
                            Model: <input onChange={handleInputChange} required min="2" type="text" name="productModel" value={newSnow.productModel} />
                            Quantity: <input onChange={handleInputChange} required type="number" name="quantity" value={newSnow.quantity} />
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
