import "../styles/cart.css";
import { Link } from "react-router-dom";
import  {IndividualCart} from "./IdividualCart";
export const Cart = () => {
  const datos = true;
  return (
    <>
      {!datos ? (
        <div className="card-empty">
          <h1> SHOPPING CARD</h1>
          <p> Your cart is currently empty. </p>
          <img
            className=" img-cartEmpty"
            alt="cart empty"
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          ></img>
          <Link to={"/"}>
            <button className="btn btn-dark  btn-cart">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      ) : (
        <IndividualCart/>
      )}
    </>
  );
};
