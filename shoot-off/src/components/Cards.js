import React, { useContext, useState, useEffect } from "react";
import { Card } from "./Card";
import "../styles/cards.css";
import { ReqContext } from "../context/RequestState";
import { useLocation } from "react-router-dom";


export const Cards = () => {
  const location = useLocation().pathname;
  const path= location.slice(1,11)
  const categorie= location.slice(12)

  const { getAllProducts, getProductsByCategory } = useContext(ReqContext);
  const [products, setProduct] = useState([]);

//si funciona pero no renderiza el front 
  useEffect(() => {
    //condicional para que segun la ruta del front sepa que pedido hacer

    if (path === "") { 
           //trae todos los productos
      getAllProducts().then((products) => {
        setProduct(products);
      });
    }else if(path === "categories"){
         //aca hacer el pedido segun la categoria escogida
        getProductsByCategory(categorie).then((products) => {
            setProduct(products);
          });
       
    }
    

  }, [location]);

  return (
    <div className="container justify-content-center">
      <div className="row">
        {products.map((product, i) => (
          <div className="col-md-4" key={i}>
            <Card props={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
