import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GroupOfProducts = ({ products }) => {
    const [total,setTotal] = useState()

    useEffect(()=>{
        setTotal(0)
        let totalAux = 0
        products.forEach(product => totalAux+=product.quantity * product.price)
        totalAux = Math.round(totalAux * 100) / 100
        setTotal(totalAux)
    },[])

  return (
    <tbody>
      <tr>
        <td className="pr-5 pr-md-3 text-center">
          {products[0].order_number}
        </td>
        <td className="text-right pr-5 pr-md-3">
          <span className="order-product-subtotal">
            ${total}
          </span>
        </td>
        <td className="text-center pr-5 pr-md-3">
          <Link to={`${products[0].order_number}`} className="btn btn-dark">
            Details
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default GroupOfProducts;
