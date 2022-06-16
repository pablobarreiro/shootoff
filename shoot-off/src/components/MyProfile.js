import '../styles/myProfile.css'
import React,{ useContext, useEffect, useState } from "react";
import useInput from "../commons/useInput";
import { AuthContext } from "../context/GlobalState";
import { ReqContext } from "../context/RequestState";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { ModalWindow } from "./ModalWindow";

const Input = ({state,onChange}) => {
    return (
        <input
            type="input"
            className="form-control"
            id="Input"
            value={state}
            onChange={onChange}
        />
    )
}

const MyProfile = () => {
  const { user, toggleAuth } = useContext(AuthContext);
  const { editUser } = useContext(ReqContext)
  const [editable,setEditable] = useState(false)
  const username = useInput(user.user_name)
  const email = useInput(user.email)
  const password = useInput('')
  const password2 = useInput('')
  const phone = useInput(user.phone)
  const street = useInput(user.street)
  const streetNumber = useInput(user.street_number)
  const city = useInput(user.city)
  const country = useInput(user.country)
  const postalCode = useInput(user.postal_code)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const editedUser = {
        user_name: username.state,
        email: email.state,
        phone: phone.state,
        street: street.state,
        street_number: streetNumber.state,
        city: city.state,
        country: country.state,
        postal_code: postalCode.state,
    }
    if (!password.length) {
        editUser(user.id,editedUser) // edito usuario sin cambiar password
        .then(data => data.user)
        .then(user => {
            toggleAuth(null)
            toggleAuth(user)
            setEditable(false)
            swal({ title: "Edited correctly", icon: "success" })
        })
    } 
    else if (password !== password2) return swal({ title: "Error", text:"Password doesn't match", icon: "error" })
    else {
        editedUser.password = password
        editUser(user.id,editedUser)
        .then(data => data.user)
        .then(user => {
            toggleAuth(null)
            toggleAuth(user)
            setEditable(false)
            swal({ title: "Edited correctly", icon: "success" })
        })
    }   
  }

  return (
    <>
      <div className="login card text-center profile-padding">
        <div className="card-header">Profile</div>
        <div className="card-body"></div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label id="card-title" className="form-label">
                User Name: {!editable?user.user_name:<Input state={username.state} onChange={username.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputEmail1 card-title" className="form-label">
                Email address: {!editable?user.email:<Input state={email.state} onChange={email.onChange} />}
            </label>
            </div>

            {editable&&<div className="mb-3">
            <label id="exampleInputPassword1" className="form-label">
                New Password: <input 
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password.state} 
                onChange={password.onChange} 
                placeholder="Set new Password"/>
            </label>
            <label id="exampleInputPassword1" className="form-label">
                <input 
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password2.state} 
                onChange={password2.onChange} 
                placeholder="Confirm new Password" />
            </label>
            </div>}
            <div className="mb-3">
            <label id="InputPhoneNumber" className="form-label">
                Phone number: {!editable?user.phone:<Input state={phone.state} onChange={phone.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputAdress" className="form-label">
                Street: {!editable?user.street:<Input state={street.state} onChange={street.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputAdress" className="form-label">
                Street number: {!editable?user.street_number:<Input state={streetNumber.state} onChange={streetNumber.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputCity" className="form-label">
                City: {!editable?user.city:<Input state={city.state} onChange={city.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputCountry" className="form-label">
                Country: {!editable?user.country:<Input state={country.state} onChange={country.onChange} />}
            </label>
            </div>
            <div className="mb-3">
            <label id="InputPostalCode" className="form-label">
                Postal code: {!editable?user.postal_code:<Input state={postalCode.state} onChange={postalCode.onChange} />}
            </label>
            </div>
            {editable && <div className="mb-3">
                <button className="btn btn-dark  ">
                    <p className="checkout">Confirm</p>
                </button>
            </div>}
        </form>
        {!editable && <div className="mb-3">
            <button onClick={()=>{setEditable(true)}} className="btn btn-dark  ">
                <p className="checkout">Edit</p>
            </button>
        </div>}
         

        <div className="mb-3">
            <Link to={`history`} className="btn btn-dark  ">
                <p className="checkout">Previous orders</p>
            </Link>
        </div>
        {user.admin || user.employee ? <div className="card-header">Role Options</div> : <></>}
        <div className="mb-3">
            {user.admin ? <Link to={"/users/admin"} className="btn btn-dark"> 
                    <p className="checkout">User list</p>
            </Link> : <></>}
        </div>
        
        <div className="mb-3">
            {user.admin || user.employee ? <ModalWindow/> : <></>}
        </div>

      </div>
       
    </>
  );
};

export default MyProfile;
