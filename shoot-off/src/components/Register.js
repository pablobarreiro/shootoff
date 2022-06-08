import React from "react";
import "../styles/login.css";
import useInput from "../commons/useInput";
import { Link } from "react-router-dom";

export const Register = () => {
  const email = useInput("");
  const password = useInput("");
  const name =useInput("")

  const handleSumit = (e) => {
    e.preventDefault();

    // axios.post("ruta para confirmar un usurio", {
    //   email: email["state"],
    //   password: password["state"],
    // }).then((data)=>{}
    // }).catch(err=>console.log(err))
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
              </label>
              <input type="text" className="form-control"  {...name}/>
            </div>
            <div className="mb-3">
              <label id="exampleInputEmail1 card-title" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                {...email}
              />
            </div>
            <div className="mb-3">
              <label id="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                autoComplete="true"
                {...password}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="card-footer text-muted">
          
          Already have an account? <Link to="/login"> create one </Link>
        </div>
      </div>
    </>
  );
};
