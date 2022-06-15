import { createContext, useState } from 'react';
import React from "react"


const cartContextDefaultValues = {};

  export const CartContext = createContext(cartContextDefaultValues);

  const CartContextProvider = ({ children }) => {
    const [cartProducts,setCartProducts] = useState([])
  
      return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
          {children}
        </CartContext.Provider>
      );
  };
        
  


export default CartContextProvider