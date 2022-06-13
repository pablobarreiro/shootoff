import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({ props }) => {

    return (
        <div className="card-deck">
            <div className="cards">
                <Link to={`/product/${props.id}`}>
                    <img src={props.img_url} className="card-img-top" />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{props.product_name}</h5>
                </div>
            </div>
        </div>
    )
}