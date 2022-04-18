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
        rented: 0,
        location: "",
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
    }
    console.log(props.locations, "locations")
    // return (
    //     <>
    //         {
    //             showing
    //                 ?
    //                 <div id="new-item-form">
    //                     <div className="btn-div">
    //                         <button className="x-btn" onClick={toggleShowing}>X</button>
    //                     </div>
    //                     <form className="form" onSubmit={submitNewEquip}>
    //                         {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
    //                         {props.NewItemServerError ? <p className="form-error">{props.newItemServerError}</p> : null}
    //                         Brand: <input onChange={handleInputChange} type="text" name="brand" value={newEquip.brand} />
    //                         Model: <input onChange={handleInputChange} type="text" name="model" value={newEquip.model} />
    //                         Quantity: <input onChange={handleInputChange} type="number" name="quantity" value={newEquip.quantity} />
    //                         Location: <select onChange={handleInputChange} type="number" name="location" value={newEquip.location}>
    //                             <option></option> {props.locations.map((location)=>{
    //                                 return <option
    //                                 key={location.name}
    //                                 value={location.id}
    //                                 >
    //                                     {location.name}
    //                                 </option>
    //                             })
    //                         }
    //                             </select>
    //                         <button className="delete-edit-btn" type="submit">Submit</button>
    //                     </form>
    //                 </div>
    //                 :

    //                 <button onClick={toggleShowing} className="add-equip-btn">Add Equipment</button>
    //         }
            
    //     </>
    // )
}

export default NewEquipComponent
