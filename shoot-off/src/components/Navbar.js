import "../styles/navbar.css";
import axios from "axios";
import useInput from "../commons/useInput";
import { Link, useNavigate } from "react-router-dom";
import { BsCartFill, BsPerson } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/GlobalState";


const Navbar = () => {
  const navegate= useNavigate()
  const { user,toggleAuth } = useContext(AuthContext);
  const busqueda = useInput("");

  const logOut =()=>{
axios.post("api/user/logout").then(()=>{
  toggleAuth(null)
  navegate("/")
} )
  }

 const navbarSearch=(e)=>{

   e.preventDefault()
   console.log("busqueda");
   console.log(busqueda);
 }
 
  return (
    <><div className="container-fluid">
      <nav className="navbar nabvar-expand-sm navbar-light bg-light">
        <div className=" navbar-icons ">
          {/* {shop-home} */}
          <Link to={"/"}>
            <button className="botton-navbar navbar-brand ">
              {/* {aca va le logo si lo pudiera poner} */}
              HOME
            </button>
          </Link>

          {/* {shop-button} */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-target="#navb"
            aria-expanded="true"
            aria-label="Toggle navigation"
           
          >
            <span className="navbar-toggler-icon" />
            <div className="shop_botton">SHOP</div>
          </button>
        </div>
        
        <div  className="navbar-icons-2">
        
            {/* {search-input} */}
            <form onSubmit={navbarSearch} className="input-group">
              <input
                type="search"
                className="form-control me-2 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                {...busqueda}
              />
              <button  className="btn btn-dark" type="submit">
                Search
              </button>
            </form>

            {/* {carrito-botton} */}
            <Link to={"/cart"}>
              <button className="botton-navbar">
                <BsCartFill />
              </button>
            </Link>

            {/* {logging-botton} */}
            {user? (
              <>
              <button className="botton-login" onClick={logOut}>
                <div className="botton-descrition">log-Out</div>
                  </button>
              <div className="botton-descrition"> {user.user_name}</div>
             
              </>
            ):
              <Link to={"/login"}>
              <button className="botton-login">
                <BsPerson />
                <div className="botton-descrition">sign in</div>
              </button>
            </Link>}
            
          </div>
          
      </nav>  </div>
    </>
  );
};
export default Navbar;
