import React, { useState } from "react"

const SingleSnowboardComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateSnow, setUpdateSnow] = useState({
        type: "Snowboard",
        brand: props.snows.brand,
        model: props.snows.model,
        quantity: props.snows.quantity,
        rented: props.snows.rented,
        location: props.snows.location,
        id: props.snows.id 
    })
  
    const handleInputChange = (e) => {
        setUpdateSnow({
            ...updateSnow,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateSnow = (e) => {
        e.preventDefault();
        props.updateSnow(props.snows.id, updateSnow)
        setShowing(false)
    }

    return (
        <div className="index-single-item">
            <h2>{props.snows.brand}</h2>
            <h3>{props.snows.model}</h3>
            {props.snows.quantity > 0
                ?
                <div className="index-single-item-details">
                    <p>Available For Rental: {props.snows.quantity}</p>
                </div>
                : 
                <p>Out of Stock!</p>
            }
            {props.snows.rented > 0
            ?
            <div className="index-single-items-details">
                <p>Currently Rented: {props.snows.rented}</p>
            </div>
            :
            <p>Currently Rented: 0</p>
            }
            <h5>Location: {props.snows.location}</h5>
            <button className="delete-edit-btn" onClick={() => {
                props.deleteSnows(props.snows._id)
            }}>Delete</button>
            {
                showing ?
                    <div id="edit-item-form">
                        <div className="btn-div">
                        <button className="x-btn" onClick={toggleShowing}>X</button>
                        </div>
                        <form className="form" onSubmit={submitUpdateSnow}>
                            Brand: <input onChange={handleInputChange} type="text" name="brand" value={updateSnow.brand} />
                            Model: <input onChange={handleInputChange} type="text" name="model" value={updateSnow.model} />
                            Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={updateSnow.quantity} />
                            Rented: <input onChange={handleInputChange} type="number" name="rented" value={updateSnow.rented}/>
                            Location: <select onChange={handleInputChange} type="number" name="location" value={updateSnow.location}>
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
                    <button className="delete-edit-btn" onClick={toggleShowing}>Edit</button>
            }
            <>
            </>
        </div>
    )
}

export default SingleSnowboardComponent;