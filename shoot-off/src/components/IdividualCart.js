import React,{ useContext, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartState";
import { ReqContext } from "../context/RequestState";
import "../styles/cart.css";

export const IndividualCart = ({i, handleRemove}) => {
  const {editCartProduct,getUserCart} = useContext(ReqContext)
  const {cartProducts,setCartProducts} = useContext(CartContext)
  const [quantity,setQuantity] = useState(cartProducts[i].quantity)

  const handleChange = (e) => {
    if(e.target.value <= 0) setQuantity(1)
    else if(e.target.value >= cartProducts[i].stock) setQuantity(cartProducts[i].stock)
    else setQuantity(e.target.value)
  }

  //cuando cambia la cantidad, modifico la db
  useEffect(() => {
    editCartProduct(cartProducts[i].id,{quantity})
    .then(()=>{
      getUserCart(cartProducts[i].user_id).then(userCart=>{
        setCartProducts(userCart)
      })
    })
  },[quantity])

return (
  <tbody>
    <tr>
      <td className="d-none d-md-table-cell">
        <Link to={`/product/${cartProducts[i].product_id}`}>
          <img
            className="img-fully"
            src={cartProducts[i].img_url}
            alt="img.product"
          />
        </Link>
      </td>
      <td className="pr-0 pr-md-2">{cartProducts[i].product_name}</td>
      <td className="pr-0 pr-md-2">
          <input 
          type="number"
          className="form-control edit-value" 
          value={quantity}
          onChange={handleChange}
          />
      </td>
      <td className="d-none d-md-table-cell text-right">
        <span className="order-product-price">${cartProducts[i].price}</span>
      </td>
      <td className="text-right pr-5 pr-md-3">
        <span className="order-product-subtotal">${Math.floor(cartProducts[i].price * quantity * 100) / 100}</span>
      </td>
      <th>
          <button className="remove-btn" onClick={() => handleRemove(cartProducts[i].id)}>
          <li className="list-group-item item">
            <BsFillTrashFill />
          </li>
        </button>
      </th>
    </tr>
  </tbody>

  );
};
