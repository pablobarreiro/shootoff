import "./App.css";
import React from "react"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cards } from './components/Cards';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from "./components/Register";
import { Cart } from "./components/Cart"
import { SingleProduct } from "./components/SingleProduct";
import {Checkout} from "./components/Checkout"
import UserAdmin from "./components/UserAdmin";
import AuthContextProvider from "./context/GlobalState";
import ReqContextProvider from "./context/RequestState";
import CartContextProvider from "./context/CartState";
import MyProfile from "./components/MyProfile";
import HistorySales from "./components/HistorySales";
import IndividualSale from "./components/IndividualSale";


function App() {

  return (
    <>
      <ReqContextProvider>
      <CartContextProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/users/admin" element={<UserAdmin />} />
          <Route path="/categories/:item" element={<Cards/>}/>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="/search/:search" element={<Cards/>}/>
          <Route path="/users/me" element={<MyProfile />} />
          <Route path="/users/me/history" element={<HistorySales />} />
          <Route path="/users/me/history/:order_number" element={<IndividualSale />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
      </CartContextProvider>
      </ReqContextProvider>
    </>
  );
}

export default App;
