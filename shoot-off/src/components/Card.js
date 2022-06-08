import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({ props }) => {


    return (
        <div className='card text-center'>
            <Link to={`/product/${props.id}`}>
                <img src={props.img} />
            </Link>
            <div className='card-body'>
                <h4>{props.nombre}</h4>
                <p className='card-text text-secondary'>{props.descripcion}</p>
            </div>
        </div>
    )
}