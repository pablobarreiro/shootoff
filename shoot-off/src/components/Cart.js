import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import  {IndividualCart} from "./IdividualCart";
import React,{ useContext, useEffect, useState } from "react";
import { ReqContext } from "../context/RequestState"
import { AuthContext } from "../context/GlobalState";
import { CartContext } from "../context/CartState";

export const Cart = () => {
  const navigate = useNavigate()
  const {getUserCart,deleteCartProduct} = useContext(ReqContext)
  const {user, isAuthenticated} = useContext(AuthContext)
  const {cartProducts, setCartProducts} = useContext(CartContext)
  const [total,setTotal] = useState(0)

  // Traigo todos los productos que estan guardados en el carrito del usuario
  useEffect(() => {
    if(isAuthenticated) {
      getUserCart(user.id)
      .then(userCart => {
        setCartProducts(userCart)
      })
    } else navigate('/login')
  },[])

  // Calculo el total
  useEffect(()=>{
    setTotal(0)
    let totalAux = 0
    cartProducts.forEach(product => {
      totalAux += product.quantity * product.price})
    setTotal(Math.floor(totalAux * 100) / 100)
  },[cartProducts])

  // Elimino 1 producto del carrito (toco el tachito)
  const handleRemove = (productId) => {
    deleteCartProduct(productId)
    .then(()=>{
      getUserCart(user.id)
      .then(products => {
        setCartProducts(products)
      })
    })
  };

  return (
    <>
      {!cartProducts.length ? (
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
        <div className="container inner-page ">
          <table className="table">
          <thead>
            <tr>
              <th className="d-sm-table-cell d-md-none"></th>
              <th>Product</th>
              <th className="d-none d-md-table-cell"></th>
              <th className="table-qty text-center">Quantity</th>
              <th className="d-none d-md-table-cell text-right">Unit Price</th>
              <th className="text-right pr-5 pr-md-3">Subtotal</th>
              <th />
            </tr>
          </thead>
          {cartProducts.map((cartProduct,i) => <IndividualCart i={i} handleRemove={handleRemove} key={i}/> )}
          <tfoot>
            <tr>
            <th />
            <th />
            <th />
            <th>TOTAL PRICE</th>
            <th>${total}</th>
            <th>
              <Link to={isAuthenticated ? "/checkout" : "/login"}>
                <button className="btn btn-dark  ">
                <p className="checkout">Checkout</p>
                </button>
              </Link>
            </th> 
            </tr>
          </tfoot>
          </table>
        </div>
      )}
    </>
  );
};
