import React, { useState } from "react";

const SingleSkiComponent = (props) => {
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateSki, setUpdateSki] = useState({
        type: "Ski",
        brand: props.skis.brand,
        model: props.skis.model,
        quantity: props.skis.quantity,
        rented: props.skis.rented,
        _id: props.skis._id
    })

    const handleInputChange = (e) => {
        setUpdateSki({
            ...updateSki,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateSki = (e) => {
        e.preventDefault();
        props.updateSki(props.skis._id, updateSki)
        setShowing(false)
    }

    return (
        <div className="index-single-item">
            <h2>{props.skis.brand}</h2>
            <h3>{props.skis.model}</h3>
            {props.skis.quantity > 0
                ?
                <div className="index-single-item-details">
                    <p>Available For Rental: {props.skis.quantity}</p>
                </div>
                :
                <p>Out of Stock!</p>
            }
            {props.skis.rented > 0
                ?
                <div className="index-single-items-details">
                    <p>Currently Rented: {props.skis.rented}</p>
                </div>
                :
                <p>Currently Rented: 0</p>
            }
            <button className="delete-edit-btn" onClick={() => {
                props.deleteSkis(props.skis._id)
            }}>Delete</button>
            {
                showing ?
                    <div id="edit-item-form">
                        <div className="btn-div">
                            <button className="x-btn" onClick={toggleShowing}>X</button>
                        </div>
                        <form className="form" onSubmit={submitUpdateSki}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            Brand: <input onChange={handleInputChange} type="text" name="productBrand" value={updateSki.brand} />
                            Model: <input onChange={handleInputChange} type="text" name="productModel" value={updateSki.model} />
                            Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={updateSki.quantity} />
                            Rented: <input onChange={handleInputChange} type="number" name="rented" value={updateSki.rented} />
                            <button className="delete-edit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                    :
                    <button className="delete-edit-btn" onClick={toggleShowing}>Edit</button>
            }
            <>
            </>
        </div>
    )
}

export default SingleSkiComponent;