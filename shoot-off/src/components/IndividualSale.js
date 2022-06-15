import React,{ useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/GlobalState";
import { ReqContext } from "../context/RequestState";
import { groupBy } from "../utils/functions";
import IndividualSaleProduct from "./IndividualSaleProduct";

const IndividualSale = () => {
    const {order_number} = useParams()
    const [saleInfo,setSaleInfo] = useState([])
    const {userCheckoutHistory} = useContext(ReqContext)
    const {user} = useContext(AuthContext)
    
    useEffect(() => {
        userCheckoutHistory(user.id).then((historySales) => {
            const newSales = groupBy(historySales,'order_number')
            console.log('NEW SALE',newSales)
            const saleOrder = newSales[order_number]
            console.log('ORDER NUMBER',order_number)
            console.log('SALEORDER',saleOrder)
            setSaleInfo(saleOrder);
        });
      }, []);

  return (
    <div className="container inner-page ">
    <table className="table">
    <thead>
      <tr>
        <th />
        <th>Product</th>
        <th className="table-qty text-center">Quantity</th>
        <th className="d-none d-md-table-cell text-right">Unit Price</th>
        <th className="text-right pr-5 pr-md-3">Subtotal</th>
      </tr>
    </thead>
    {saleInfo.map((saleProduct,i) => <IndividualSaleProduct saleProduct={saleProduct} key={i}/> )}
    <tfoot>
      <tr>
      <th />
      <th />
      <th />
      <th></th>
      <th className="d-none d-md-table-cell text-center">
              <Link to={`/users/me/history`}>
                <button className="btn btn-dark  ">
                  <p className="checkout">Back</p>
                </button>
              </Link>
            </th>
      </tr>
    </tfoot>
    </table>
  </div>
  )
};

export default IndividualSale