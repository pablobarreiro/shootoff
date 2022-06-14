import axios from 'axios'
import React, { useContext } from 'react'
import "../styles/singleProduct.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ReqContext } from '../context/RequestState'
import { AuthContext } from '../context/GlobalState'
import { AiFillStar } from "react-icons/ai";
import swal from 'sweetalert'

const products = [
  {
    nombre: "TITULO DEL PRODUCTO",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum sapiente odit tempore nemo eveniet nihil fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid, deleniti beatae assumenda ipsa reprehenderit.",
    img: "https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg",
    precio: "$1111",
  },
];

export const SingleProduct = () => {
  const [product, setProduct] = useState({});

  const { productId } = useParams();

  const [coment, setComent] = useState("");

  const [coments, setComents] = useState([]);

  const [starValue, setStarValue] = useState(0);

  const [hoverValue, setHoverValue] = useState(undefined);
  
  const [quantity,setQuantity] = useState(1)
  
  const {user} = useContext(AuthContext)
  
  const {postCartProduct} = useContext(ReqContext)
    

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
    comentsArray.push(coment);
    setComents(comentsArray);
    axios.put(`/api/product/${productId}`, { coments: coments });
  };

  // 
  const handleQuantityChange = (e) => {
    if(e.target.value <= 0) setQuantity(1)
    else setQuantity(e.target.value)
  }
  
  // agregar al carrito
  const handleAddToCartClick = () => {
    postCartProduct({user_id:user.id,quantity,...product,product_id:product.id})
    .then(()=>{
      swal({ title: "Added to cart", icon: "success" })
    })
  }


    return (
        <>
            <div className='details'>
                <div className='big-img'>
                    {/* HABRIA QUE INCLUIR DENTRO DEL MODELO DE PRODUCTOS UN KEY DE IMG */}
                    <img src={product.img_url} />
                </div>
                <div className='box'>
                    <div className='row'>
                        <h2>{product.product_name}</h2>
                        <span>{product.price}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className='flex'>
                        <input 
                        type='number'
                        className="form-control edit-value" 
                        value={quantity}
                        onChange={handleQuantityChange}
                        />
                        <button className='cart' onClick={handleAddToCartClick}>Add to cart</button>
                        {/* <input type="number" min="0" value="1" /> */}
                    </div>
          <span>Reviews</span>
          <div className="btnContainer">
            {star.map((_, index) => {
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
            })}
          </div>
          <button className="btnSubmit">Submit</button>
          <div>
            {product.coments}comentarios
            <form>
              <input onChange={handleChange} value={coment} />
              <button onClick={addComent}>Agregar comentario</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

