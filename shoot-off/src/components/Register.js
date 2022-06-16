import React from "react";
import axios from "axios";
import "../styles/login.css";
import useInput from "../commons/useInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/GlobalState";
import { useContext } from "react";
import swal from "sweetalert";

export const Register = () => {
  const navegate = useNavigate();
  const email = useInput("");
  const password = useInput("");
  const name = useInput("");
  const Street = useInput("");
  const phone = useInput("");
  const streetNumber = useInput("");
  const city = useInput("");
  const postalCode = useInput("");
  const country = useInput("");

  const { toggleAuth } = useContext(AuthContext);

  const handleSumit = (e) => {
    e.preventDefault();
    axios
      .post("api/user/register/", {
        user_name: name.state,
        email: email.state,
        password: password.state,
        street: Street.state,
        phone: Number(phone.state),
        street_number: Number(streetNumber.state),
        city: city.state,
        postal_code: Number(postalCode.state),
        country: country.state,
        admin:false,
        employee:false
      })
      .then((res) => res.data)
      .then((regUser) => {
        toggleAuth(regUser);
        swal({ title: "Welcome", text: "User created", icon: "success" });
        navegate("/");
      });
  };

  return (
    <>
      <div className="login card text-center ">
        <div className="card-header">Register</div>
        <div className="card-body">
          <form onSubmit={handleSumit}>
            <div className="mb-3">
              <label id=" card-title" className="form-label">
                Complete Name
                <input type="text" className="form-control" {...name} />
              </label>
            </div>
            <div className="mb-3">
              <label id="exampleInputEmail1 card-title" className="form-label">
                Email address
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  {...email}
                />
              </label>
            </div>
            <div className="mb-3">
              <label id="exampleInputPassword1" className="form-label">
                Password
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  autoComplete="true"
                  {...password}
                />
              </label>
            </div>

            <div className="mb-3">
              <label id="card-title">
                Phone
                <input type="number" className="form-control" {...phone} />
              </label>
            </div>

            <div className="row mx-auto">
              <div className="col-6">
                <label id=" card-title">City</label>
                <input type="text" className="form-control" {...city} />
              </div>
              <div className="col-6">
                <label id=" card-title">Country</label>
                <input type="text" className="form-control" {...country} />
              </div>
            </div>
            <div className="row mx-auto">
              <div className="col-3">
                <label id=" card-title">Street</label>
                <input type="text" className="form-control" {...Street} />
              </div>
              <div className="col-3">
                <label id=" card-title">Street Number</label>
                <input type="text" className="form-control" {...streetNumber} />
              </div>

              <div className="col-5">
                <label id=" card-title">Postal code</label>
                <input type="text" className="form-control" {...postalCode} />
              </div>
            </div>
            <button type="submit" className="btn btn-dark btn-sumit">
              Submit
            </button>
          </form>
        </div>
        <div className="card-footer text-muted">
          Already have an account? <Link to="/login"> login </Link>
        </div>
      </div>
    </>
  );
};
