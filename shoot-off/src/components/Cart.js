import "../styles/cart.css";
import { Link } from "react-router-dom";
import { TbX } from "react-icons/tb";
export const Cart = () => {
  const handleRemove = () => {
    console.log("se ha removido de favs");
  };
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
      ) : (<>
        <div class="card-deck">
          <div className="card card-fully">
            <Link to={"/:products"}>
              <img
                className="img-fully"
                src="https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg"
                alt="img.product"
              ></img>
            </Link>
            
            <div className="descricion">
              <h2 className="card-title">Name product</h2>
              <figcaption className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur ipsum sapiente odit tempore nemo eveniet nihil
                fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid,
                deleniti beatae assumenda ipsa reprehenderit.
              </figcaption>
              <li className="list-group-item">price</li>
            </div>
            <ul className=" list-group list-group-flush">
              <h3 className="list-group-item">price</h3>
              <button className="remove-btn" onClick={handleRemove}>
                <li className="list-group-item item">
                  <TbX />
                  remove
                </li>
              </button>
            </ul>
          </div>
          <div className="card-columns">
            <div className="card card-sumary">
              <h2 className="card-title">ORDER SUMMARY</h2>
              <p className="list-group-item">Subtotal</p>
              <p className="list-group-item">Shipping</p>
              <p className="list-group-item">Taxes</p>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};
