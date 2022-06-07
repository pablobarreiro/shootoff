import React from 'react'

export const Card = (props) => {
    return (
        <div className='card text-center'>
            <img src={props.img} />
            <div className='card-body'>
                <h4>{props.nombre}</h4>
                <p className='card-text text-secondary'>{props.descripcion}</p>
                <button className='btn btn-outline-secondary rounded-0'>Ver detalles</button>
            </div>
        </div>
    )
}