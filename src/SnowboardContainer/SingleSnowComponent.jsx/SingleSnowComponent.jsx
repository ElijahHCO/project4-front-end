import React, { useState } from "react"

const SingleSnowboardComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateSnow, setUpdateSnow] = useState({
        type: "Snowboard",
        productBrand: props.snows.productBrand,
        productModel: props.snows.productModel,
        quantity: props.snows.quantity,
        rented: props.snows.rented,
        _id: props.snows._id 
    })
  
    const handleInputChange = (e) => {
        setUpdateSnow({
            ...updateSnow,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateSnow = (e) => {
        e.preventDefault();
        props.updateSnow(props.snows._id, updateSnow)
        setShowing(false)
    }

    return (
        <div className="index-single-item">
            <h2>{props.snows.productBrand}</h2>
            <h3>{props.snows.productModel}</h3>
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
                            Brand: <input onChange={handleInputChange} type="text" name="productBrand" value={updateSnow.productBrand} />
                            Model: <input onChange={handleInputChange} type="text" name="productModel" value={updateSnow.productModel} />
                            Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={updateSnow.quantity} />
                            Rented: <input onChange={handleInputChange} type="number" name="rented" value={updateSnow.rented}/>
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