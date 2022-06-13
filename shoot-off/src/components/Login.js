import React from "react";
import axios from "axios";
import "../styles/login.css";
import useInput from "../commons/useInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/GlobalState";
import { useContext } from "react";
import swal from "sweetalert";

export const Login = () => {
  const navegate = useNavigate();
  const email = useInput("");
  const password = useInput("");

  const { toggleAuth } = useContext(AuthContext);
 ;

  const handleSumit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", { email: email.state, password: password.state })
      .then((res) => res.data)
      .then((logUser) => {
        toggleAuth(logUser);
        navegate("/");
      }).catch(()=>{
        swal({ title: "User not found", text: "please check the user data", icon: "error" })})
  };

  return (
    <>
      <div className="login card text-center ">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleSumit}>
            <div className="mb-3">
              <label id="exampleInputEmail1 card-title" className="form-label">
                Email address
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
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
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="card-footer text-muted">
          {" "}
          Don’t have an account? 
          <Link to="/register"> create one </Link>
        </div>
      </div>
    </>
  );
};
