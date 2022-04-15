import React, { useState } from "react"

const SingleLocationComponent = (props) => {
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" })
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateLocation, setUpdateLocation] = useState({
        name: props.location.name,
        address: props.location.address,
        id: props.location.id
    })

    const handleInputChange = (e) => {
        setUpdateLocation({
            ...updateLocation,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateLocation = (e) => {
        e.preventDefault();
        props.updateLocation(props.location.id, updateLocation)
        setShowing(false)
    }

    return (
        <div className="index-single-item">
            <h2>Store Location: <br /> 
                {props.location.name}</h2>
            <h3>Address: <br /> 
                {props.location.address}</h3>
            <h4>ID: {props.location.id}</h4>
            <button className="delete-edit-btn" onClick={() => {
                props.deleteLocation(props.location.id)
            }}>Delete</button>
            {
                showing ?
                    <div id="edit-item-form">
                        <div className="btn-div">
                            <button className="x-btn" onClick={toggleShowing}>X</button>
                        </div>
                        <form className="form" onSubmit={(e)=>submitUpdateLocation(e)}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            Name: <input onChange={handleInputChange} type="text" name="name" value={updateLocation.name} />
                            Address: <input onChange={handleInputChange} type="text" name="address" value={updateLocation.address} />
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

export default SingleLocationComponent