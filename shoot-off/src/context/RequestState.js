import { createContext } from 'react';
import React from "react"
import axios from 'axios';


const reqContextDefaultValues = {
  getAllProducts: () => {},
  getOneProduct: () => {},
  postOneProduct: () => {},
  editOneProduct: () => {},
  deleteOneProduct: () => {},
  getProductsByCategory: () => {},
  getProductsBySearch: () => {},
  editUser: () => {},
  getAllUsers: () => {},
  deleteOneUser: () => {},
  promoteOneUser: () => {},
  getUserCart: () => {},
  postCartProduct: () => {},
  editCartProduct: () => {},
  deleteCartProduct: () => {},
  checkoutCart: () => {},
  confirmCheckout: () => {},
  rejectCheckout: () => {},
  userCheckoutHistory: () => {},
};

export const ReqContext = createContext(reqContextDefaultValues);

const ReqContextProvider = ({ children }) => {
const allRequests = {
  //Pedidos de Products
  getAllProducts: () => {
    return axios.get(`/api/product`)
  .then(res => res.data)
  },
  getOneProduct: (productId) => {
    return axios.get(`/api/product/${productId}`)
  .then(res => res.data)
  },
  postOneProduct: (productData) => {
    return axios.post(`/api/product/`,productData)
  .then(res => res.data)
  },
  editOneProduct: (productData) => {
    return axios.put(`/api/product/`,productData)
  .then(res => res.data)
  },
  deleteOneProduct: (productId) => {
    return axios.delete(`/api/product/${productId}`)
  .then(res => res.data)
  },
  getProductsByCategory: (category) => {
    return axios.get(`/api/product/category/${category}`)
  .then(res => res.data)
  },
  getProductsBySearch: (searchQuery) => {
    return axios.get(`/api/product/search/${searchQuery}`)
  .then(res => res.data)
  },
  //Pedidos de Users
  editUser: (userId,userData) => {
    return axios.put(`/api/user/me/${userId}`,userData)
  .then(res => res.data)
  },
  getAllUsers: (adminId) => {
    return axios.get(`/api/user/admin/${adminId}/users`)
  .then(res => res.data)
  },
  deleteOneUser: (adminId,userId) => {
    return axios.delete(`/api/user/admin/${adminId}/remove/${userId}`)
  .then(res => res.data)
  },
  promoteOneUser: (adminId,userId) => {
    return axios.put(`/api/user/admin/${adminId}/remove/${userId}`)
  .then(res => res.data)
  },
  //Pedidos de Carrito
  getUserCart: (userId) => {
    return axios.get(`/api/cart/${userId}`)
  .then(res => res.data) 
  },
  postCartProduct: (productData) => {
    return axios.post(`/api/cart/`,productData)
  .then(res => res.data)
  },
  editCartProduct: (cartId, productData) => {
    return axios.put(`/api/cart/${cartId}`, productData)
  .then(res => res.data) 
  },
  deleteCartProduct: (cartId) => {
    return axios.delete(`/api/cart/${cartId}`)
  .then(res => res.data) 
  },
  //Pedidos de Checkout/Ventas/Sales
  checkoutCart: (userId) => {
    return axios.post(`/api/checkout/${userId}`)
  .then(res => res.data) 
  },
  confirmCheckout: (orderNumber) => {
    return axios.put(`/api/checkout/confirm/${orderNumber}`)
  .then(res => res.data) 
  },
  rejectCheckout: (orderNumber) => {
    return axios.put(`/api/checkout/confirm/${orderNumber}`)
  .then(res => res.data) 
  },
  userCheckoutHistory: (userId) => {
    return axios.get(`/api/checkout/sales/${userId}`)
  .then(res => res.data) 
  },
}
  return (
      <ReqContext.Provider value={{ ...allRequests }}>
        {children}
      </ReqContext.Provider>
    );
};
        
  


export default ReqContextProvider