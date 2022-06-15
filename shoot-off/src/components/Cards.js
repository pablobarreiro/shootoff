import React, { useContext, useState, useEffect } from "react";
import { Card } from "./Card";
import "../styles/cards.css";
import { ReqContext } from "../context/RequestState";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination"


export const Cards = () => {
  const location = useLocation().pathname;

  const path = location.slice(1, 11)
  const categorie = location.slice(12)
  const pathSearch = location.slice(1,7)
  const search = location.slice(8)


  const { getAllProducts, getProductsByCategory, getProductsBySearch } = useContext(ReqContext);
  const [products, setProduct] = useState([]);

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9)

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
    }else if(pathSearch === "search"){
         // pide segun la barra de busqueda
      getProductsBySearch(search).then((products) => {
        setProduct(products);
      });
    }
  }, [location]);


  //Funcion para cambiar de pagina
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct)


  return (
    <>
      <div className="container justify-content-center">
        <div className="row">
          {currentProduct.map((product, i) => (
            <div className="col-md-4" key={i}>
              <Card props={product} />
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <Pagination totalProducts={products.length} productsPerPage={productsPerPage} paginate={paginate} />
    </>
  );
};
