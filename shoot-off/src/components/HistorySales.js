import React,{ useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/GlobalState";
import { ReqContext } from "../context/RequestState";
import { groupBy } from "../utils/functions"
import GroupOfProducts from "./GroupOfProducts";

const HistorySales = () => {
  const [sales, setSales] = useState({});
  const { userCheckoutHistory } = useContext(ReqContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    userCheckoutHistory(user.id).then((historySales) => {
        const newSales = groupBy(historySales,'order_number')
        setSales(newSales);
    });
  }, []);

  return (
    <div className="container inner-page profile-padding">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center pr-5 pr-md-3">Order Number</th>
            <th className="d-none d-md-table-cell text-right">Total Price</th>
            <th className="d-none d-md-table-cell text-center">View Details</th>
          </tr>
        </thead>
        {Object.keys(sales).map((orderNumber, i) => (
          <GroupOfProducts products={sales[orderNumber]} key={i} />
        ))}
        <tfoot>
          <tr>
            <th />
            <th />
            <th className="d-none d-md-table-cell text-center">
              <Link to={`/users/me`}>
                <button className="btn btn-dark  ">
                  <p className="checkout">Back</p>
                </button>
              </Link>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default HistorySales;
