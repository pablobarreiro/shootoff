import "../styles/navbar.css"
import { BsCartFill, BsPerson} from "react-icons/bs";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className=" navbar-icons ">
          {/* {shop-home} */}
          <button className="botton-navbar">
            {/* {aca va le logo si lo pudiera poner} */}
            HOME
          </button>
          {/* {shop-button} */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
            <div className="shop_botton">SHOP</div>
          </button>
        </div>
        
        <div className="navbar-icons-2">
       
          <div className="input-group ">
            {/* {search-input} */}
            <input
              type="search"
              className="form-control me-2 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button className="btn btn-dark" type="submit">
              Search
            </button>
          </div>
          <button className="botton-navbar">
               <BsCartFill />
          </button>
          <button className="botton-login">
          <BsPerson/>
          <div className="botton-descrition">sign in</div> 
          </button>

        </div>
    
      </nav>
    </>
  );
};
export default Navbar;
