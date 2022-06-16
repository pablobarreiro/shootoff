import "../styles/navbar.css";
import axios from "axios";
import useInput from "../commons/useInput";
import { Link, useNavigate } from "react-router-dom";
import { BsCartFill, BsPerson } from "react-icons/bs";
import React,{ useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/GlobalState";


const Navbar = () => {
  const navegate = useNavigate();
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [dropdowCollapsed, setdropdowCollapsed] = useState(false);
  const [categories, setcategories ]= useState([])
  const handleNavCollapsed = () => setNavCollapsed(!navCollapsed);
  const dropdownMenu = () =>{
    setdropdowCollapsed(!dropdowCollapsed);
     axios.post("/api/product/categories/").then((res)=>res.data).then((ArrCategories)=>{
 setcategories(ArrCategories)
  })
  } 

  const { user, toggleAuth } = useContext(AuthContext);
  const busqueda = useInput("");

  const logOut = () => {
    axios.post("/api/user/logout").then(() => {
      toggleAuth(null);
      navegate("/");
    });
  };
  
  useEffect(()=>{
    axios.get('/api/user/me')
    .then(res => res.data)
    .then(user => {
      toggleAuth(user ? user : null)
    })
  },[])

  const navbarSearch = (e) => {
   e.preventDefault()
   busqueda.state.length ? navegate(`/search/${busqueda.state}`) : navegate(`/`)
  }

  
  return (
    <>
      <nav className="navbar  fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-sm bg-light nav-style">
          {/* {shop-home} */}
          <Link to={"/"}>
            <button className="navbar-brand botton-navbar  ">
              {/* {aca va le logo si lo pudiera poner} */}
              HOME
            </button>
          </Link>

          {/* {shop-button} */}

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#menuNav"
            aria-expanded={!navCollapsed ? true : false}
            onClick={handleNavCollapsed}
          >
            <span className="navbar-toggler-icon" />
            <div className="shop_botton">SHOP</div>
          </button>
          <div className="navbar-icons">
            <div
              className={`${navCollapsed ? "collapse" : ""} navbar-collapse `}
              id="menuNav"
            >
              <ul className="navbar-nav ms-3">
                <li className="nav-item dropdown dropdown-icon">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded={dropdowCollapsed ? true : false}
                    onClick={dropdownMenu}
                  >
                    Categories
                  </div>
                  <div 
                    className={`dropdown-menu ${
                      dropdowCollapsed ? "show" : ""
                    }`}
                  >{categories.map((item,id)=>{
                    //se necesitaria hacer el map al pedido axios de las categorias 
                    return(
                      <div onClick={dropdownMenu}  key={id}>
                      <Link to={`/categories/${item}`}>
                        <div  className="dropdown-item">
                  {item} 
                    </div>
                      </Link>
                    </div>
                      
                    )
                   
                  })}
                    
                  </div>
                </li>
                <div className="navbar-icons-2">
                  <li className="nav-item">
                    {/* {carrito-botton} */}
                    <Link to={"/cart"}>
                      <button className="botton-navbar">
                        <BsCartFill />
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* {logging-botton} */}
                    {user ? (
                    
                    < div className="navbar-icons-2">
                        <button className="botton-login" onClick={logOut}>
                          <div className="botton-login">log-Out</div>
                        </button>
                        <Link to={`/users/me`} className="botton-descrition">
                        <button className="botton-login">
                          <BsPerson />
                          {user.user_name}
                        </button>
                        </Link>
                      </div>     
                    ) : (
                      <Link to={"/login"}>
                        <button className="botton-login">
                          <BsPerson />
                          <div className="botton-descrition">sign in</div>
                        </button>
                      </Link>
                   
                      
                    )}
                  </li>
                </div>
                {/* {search-input} */}

                <li className="nav-item icons">
                  <form onSubmit={navbarSearch} className="input-group ">
                    <input
                      type="search"
                      className="form-control me-2 "
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      {...busqueda}
                    />
                    <button className="btn btn-dark" type="submit">
                      Search
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
