import React, { useState } from "react"

const SingleEquipComponent = (props) => {
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateEquip, setUpdateEquip] = useState({
        type: props.equip.type,
        brand: props.equip.brand,
        model: props.equip.model,
        quantity: props.equip.quantity,
        rented: props.equip.rented,
        location: props.equip.location,
        id: props.equip.id
    })

    const handleInputChange = (e) => {
        setUpdateEquip({
            ...updateEquip,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateEquip = (e) => {
        e.preventDefault();
        props.updateEquip(props.equip.id, updateEquip)
        setShowing(false)
    }
    const locations = props.locations
    return (
        <div className="index-single-item">
            <h1>{props.equip.type}</h1>
            <h2>{props.equip.brand}</h2>
            <h3>{props.equip.model}</h3>
            {props.equip.quantity > 0
                ?
                <div className="index-single-item-details">
                    <p>Available For Rental: {props.equip.quantity}</p>
                </div>
                :
                <p>Out of Stock!</p>
            }
            {props.equip.rented > 0
                ?
                <div className="index-single-items-details">
                    <p>Currently Rented: {props.equip.rented}</p>
                </div>
                :
                <p>Currently Rented: 0</p>
            }
            <h5> Location: {props.equip.location}</h5>
            <button className="delete-edit-btn" onClick={() => {
                props.deleteEquip(props.equip.id)
            }}>Delete</button>
            {
                showing ?
                    <div id="edit-item-form">
                        <div className="btn-div">
                            <button className="x-btn" onClick={toggleShowing}>X</button>
                        </div>
                        <form className="form" onSubmit={(e)=>submitUpdateEquip(e)}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            {/* Type: <input onChange={handleInputChange} type="text" name="type" value={updateEquip.type} /> */}
                            Brand: <input onChange={handleInputChange} type="text" name="productBrand" value={updateEquip.brand} />
                            Model: <input onChange={handleInputChange} type="text" name="productModel" value={updateEquip.model} />
                            Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={updateEquip.quantity} />
                            Rented: <input onChange={handleInputChange} type="number" name="rented" value={updateEquip.rented} />
                            {/* Location: <select onChange={handleInputChange} type="number" name="location" value={updateEquip.location}>
                                <option></option> {locations.map((location)=>{
                                    return <option
                                    key={location.name}
                                    value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                })
                            }
                                </select> */}
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

export default SingleEquipComponent;