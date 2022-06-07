import React from 'react'
import { Card } from './Card'

//ESTO ESTA HARDCODEADO, HABRIA QUE RECIBIR ESTA INFO DESDE LA DB
const products = [
    {
        nombre: "TITULO DEL PRODUCTO",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum sapiente odit tempore nemo eveniet nihil fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid, deleniti beatae assumenda ipsa reprehenderit.",
        img: "https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg"
    },
    {
        nombre: "TITULO DEL PRODUCTO",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum sapiente odit tempore nemo eveniet nihil fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid, deleniti beatae assumenda ipsa reprehenderit.",
        img: "https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg"
    },
    {
        nombre: "TITULO DEL PRODUCTO",
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ipsum sapiente odit tempore nemo eveniet nihil fugiat vero dicta! Minima, eaque dolore? Quasi sunt aliquid, deleniti beatae assumenda ipsa reprehenderit.",
        img: "https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg"
    },
]

//CARDS DEBERIA RECIBIR UN PARAMETRO LLAMADO "PRODUCTS", EL CUAL SEA UN ARREGLO DE OBJETOS, CON UNA DESCRIPCION DEL PRODUCTO, NOMBRE, IMAGEN

export const Cards = () => {
    return (
        <div className='container d-flex justify-content-center'>
            <div className='row'>
                {
                    products.map((product, i) => (
                        <div className='col-md-4' key= {i}>
                            <Card nombre={product.nombre} descripcion={product.descripcion} img={product.img}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

