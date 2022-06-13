import { useContext, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ReqContext } from "../context/RequestState";
import "../styles/cart.css";

export const IndividualCart = ({cartProduct, handleRemove}) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity)
  const {editCartProduct} = useContext(ReqContext)

  const handleChange = (e) => {
    if(e.target.value <= 0) setQuantity(1)
    else setQuantity(e.target.value)
  }

  //cuando cambia la cantidad, modifico la db
  useEffect(() => {
    editCartProduct(cartProduct.id,{quantity})
  },[quantity])

return (
  <tbody>
    <tr>
      <td className="d-none d-md-table-cell">
        <Link to={`/product/${cartProduct.product_id}`}>
          <img
            className="img-fully"
            src={cartProduct.img_url}
            alt="img.product"
          />
        </Link>
      </td>
      <td className="pr-0 pr-md-2">{cartProduct.product_name}</td>
      <td className="pr-0 pr-md-2">
          <input 
          type="number"
          className="form-control edit-value" 
          value={quantity}
          onChange={handleChange}
          />
      </td>
      <td className="d-none d-md-table-cell text-right">
        <span className="order-product-price">${cartProduct.price}</span>
      </td>
      <td className="text-right pr-5 pr-md-3">
        <span className="order-product-subtotal">${cartProduct.price * quantity}</span>
      </td>
      <th>
          <button className="remove-btn" onClick={() => handleRemove(cartProduct.id)}>
          <li className="list-group-item item">
            <BsFillTrashFill />
          </li>
        </button>
      </th>
    </tr>
  </tbody>

  );
};
