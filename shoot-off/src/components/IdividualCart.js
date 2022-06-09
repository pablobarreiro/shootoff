import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/cart.css";

export const IndividualCart = () => {
  const handleRemove = () => {
    console.log("se ha removido de favs");
  };

  return (
    <>
    <div className="container inner-page ">
<table className="table">
        <thead>
          <tr>
            <th className="d-sm-table-cell d-md-none"></th>
            <th>Producto</th>
            <th className="d-none d-md-table-cell"></th>
            <th className="table-qty text-center">Cantidad</th>
            <th className="d-none d-md-table-cell text-right">Precio Unitario</th>
            <th className="text-right pr-5 pr-md-3">Subtotal</th>
            <th>
              <Link to={"/checkout"}>
                  <button className="btn btn-dark  ">
                  <p className="checkout">Checkout</p>
                  </button>
                </Link>
            </th>
            
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="d-none d-md-table-cell">
              <Link to={"/product/:id"}>
                <img
                  className="img-fully"
                  src="https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg"
                  alt="img.product"
                ></img>
              </Link>
            </td>
            <td className="pr-0 pr-md-2">
              <h3>Product name</h3>
            </td>
            <td className="pr-0 pr-md-2"></td>
            <td className="d-none d-md-table-cell text-right">
              <span className="order-product-price">$54.500</span>
            </td>
            <td className="text-right pr-5 pr-md-3">
              <span className="order-product-subtotal">$54.500</span>
            </td>
            <th>
               <button className="remove-btn" onClick={handleRemove}>
                <li className="list-group-item item">
                  <BsFillTrashFill />
                </li>
              </button>
            </th>
             
           
          </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};
