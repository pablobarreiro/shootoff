import axios from 'axios'
import React, { useContext } from 'react'
import "../styles/singleProduct.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ReqContext } from '../context/RequestState'
import { AuthContext } from '../context/GlobalState'
import { AiFillStar } from "react-icons/ai";
import swal from 'sweetalert'
import { EditProduct } from './EditProduct'



export const SingleProduct = () => {

  const [product, setProduct] = useState({});

  const { productId } = useParams();

  const [coment, setComent] = useState("");

  const [coments, setComents] = useState([]);

  const [starValue, setStarValue] = useState(0);

  const [hoverValue, setHoverValue] = useState(undefined);

  const [quantity, setQuantity] = useState(1)

  const { user, isAuthenticated } = useContext(AuthContext)

  const { postCartProduct } = useContext(ReqContext)

  useEffect(() => {
    axios
      .get(`/api/product/${productId}`)
      .then((res) => res.data)
      .then((singleProduct) => {
        setProduct(singleProduct);
        setComents(singleProduct.coments);
      });
  }, [productId]);

  const star = Array(5).fill(0);       /* Logica de reviews */

  const handleClick = (value) => {
    setStarValue(value);
  };
  const handleMouseHover = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  useEffect(() => {
    axios
      .get(`/api/product/${productId}`)
      .then((res) => res.data)
      .then((product) => {
        if (isAuthenticated)
          axios.put(`/api/product/${productId}`, {
            vote: product.vote + starValue,
            vote_count: product.vote_count + 1,
          });
      });
  }, [starValue]);

  const handleChange = function (e) {     /* Logica de comentarios */
    e.preventDefault();
    setComent(e.target.value);
  };

  const addComent = function (e) {
    e.preventDefault();
    const comentsArray = coments;
    if (isAuthenticated)
      comentsArray.push([user.user_name] + ": " + coment);
    setComents(comentsArray);
    axios.put(`/api/product/${productId}`, { coments: coments })
      .then(() => {
        axios
          .get(`/api/product/${productId}`)
          .then((res) => res.data)
          .then((singleProduct) => {
            setProduct(singleProduct);
            setComents(singleProduct.coments);
          });
      })
  };

  // 
  const handleQuantityChange = (e) => {
    if (e.target.value <= 0) setQuantity(1)
    else if (e.target.value >= product.stock) setQuantity(product.stock)
    else setQuantity(e.target.value)
  }

  // agregar al carrito
  const handleAddToCartClick = () => {
    postCartProduct({ user_id: user.id, quantity, ...product, product_id: product.id })
      .then(() => {
        swal({ title: "Added to cart", icon: "success" })
      })
  }


  return (
    <>
      <div className='details'>
        <div className='big-img'>
          {/* HABRIA QUE INCLUIR DENTRO DEL MODELO DE PRODUCTOS UN KEY DE IMG */}
          <img src={product.img_url} alt="" />
        </div>
        <div className='box'>
          <div className='row'>
            <h2>{product.product_name}</h2>
            <span>$ {product.price}</span>
          </div>
          <p>{product.description}</p>
          <div className='flex'>
            <input
              type='number'
              className="form-control edit-value"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className='cart' onClick={handleAddToCartClick}>add to cart</button>
            {/* <input type="number" min="0" value="1" /> */}
          </div>
          <span>Reviews</span>
          <div className="btnContainer">
            {starValue === 0 ? star.map((_, index) => {
              return (
                <AiFillStar
                  className="star"
                  size={24}
                  color={
                    (hoverValue || starValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseHover(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                />
              );
            }) :
              star.map((_, index) => {
                return (
                  <AiFillStar
                    className="star"
                    size={24}
                    color={
                      (hoverValue || starValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                  />
                );
              })}
          </div>
          {isAuthenticated && (user.admin || user.employee ? <EditProduct idProduct={productId} /> : <></>)}
          <div className="col">
            <hr></hr>
          </div>
          <form>
            <input onChange={handleChange} value={coment} className="form-control" />
            <button onClick={addComent} className="btn btn-dark btn-sumit">Agregar comentario</button>
          </form>
        </div>
      </div>
      <h3>Comentarios </h3>
      <div className="card-deck">
        {product.coments && product.coments.map((coment) => {
          return (
            <div className="card m-3">
              <div className="card-body ">
                <h5 className="card-title">{coment.split(":")[0]}</h5>
                <p className="card-text text-muted">{coment.split(":")[1]}</p>
              </div>
            </div>
          )
        })}
      </div >
    </>
  );
};

