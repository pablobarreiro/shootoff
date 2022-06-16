import React, {useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";


export const Card = ({ props }) => {
    const [starVal, setstarVal] = useState(0);
    const [hoverVal, setHoverVal] = useState(undefined);
    const star = Array(5).fill(0);
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9",
      };
    const reviews=props.vote/props.vote_count
    const grayStar=5-reviews
    useEffect(()=>{
        setstarVal(reviews)
        setHoverVal(grayStar)
    },[starVal])
    
    
      
    return (
        <div className="card-deck">
            <div className="cards">
                <Link to={`/product/${props.id}`}>
                    <img src={props.img_url} className="card-img-top" />
                </Link>
                <div className="card-body">
                    <h5> { star.map((_, index) => {
              return (
                <AiFillStar
                  className="star"
                  size={24}
                  color={
                    (hoverVal || starVal) > index
                      ? colors.orange
                      : colors.grey
                  }
                  key={index}
                />
              );
                })}
              </h5>
                    <h5 className="card-title">{props.product_name}</h5>
                    <h5>${props.price}</h5>
                </div>
            </div>
        </div>
  );
};
