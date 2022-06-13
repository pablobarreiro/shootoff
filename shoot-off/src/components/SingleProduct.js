import axios from 'axios'
import React from 'react'
import "../styles/singleProduct.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const products = [
    {
        nombre: "TITULO DEL PRODUCTO",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum sapiente odit tempore nemo eveniet nihil fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid, deleniti beatae assumenda ipsa reprehenderit.",
        img: "https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg",
        precio: "$1111",
    },

]

export const SingleProduct = () => {

    const [product, setProduct] = useState({})
    const { productId } = useParams()

    useEffect(() => {
        axios.get(`/api/product/${productId}`)
            .then(res => res.data)
            .then(singleProduct => {
                setProduct(singleProduct)
                console.log(singleProduct)
            })
    }, [productId])

    return (
        <>
            <div className='details'>
                <div className='big-img'>
                    {/* HABRIA QUE INCLUIR DENTRO DEL MODELO DE PRODUCTOS UN KEY DE IMG */}
                    <img src={products[0].img} />
                </div>
                <div className='box'>
                    <div className='row'>
                        <h2>{product.product_name}</h2>
                        <span>{product.price}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className='flex'>
                        <button className='cart'>Add to cart</button>
                        {/* <input type="number" min="0" value="1" /> */}
                    </div>
                    <span>Reviews</span>
                    <div className='btnContainer'>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                    </div>
                    <button className='btnSubmit'>Submit</button>
                </div>
            </div>
        </>
    )
}
