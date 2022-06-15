import React from "react"
import { Link } from 'react-router-dom'


const IndividualSaleProduct = ({saleProduct}) => {
  return (
    <tbody>
      <tr>
        <td className="d-none d-md-table-cell">
          <Link to={`/product/${saleProduct.product_id}`}>
            <img
              className="img-fully"
              src={saleProduct.img_url}
              alt="img.product"
            />
          </Link>
        </td>
        <td className="pr-0 pr-md-2">{saleProduct.product_name}</td>
        <td className="pr-0 pr-md-2 text-center">{saleProduct.quantity}</td>
        <td className="d-none d-md-table-cell text-right">
          <span className="order-product-price">${saleProduct.price}</span>
        </td>
        <td className="text-right pr-5 pr-md-3">
          <span className="order-product-subtotal">
            ${saleProduct.price * saleProduct.quantity}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default IndividualSaleProduct