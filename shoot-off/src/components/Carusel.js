import React from 'react'

export const Carusel = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://www.armeriacanigo.com.ar/wp-content/uploads/10024_1-324x324.jpg" className="d-block w-80" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://www.armeriacanigo.com.ar/wp-content/uploads/3183_1-324x324.jpg" className="d-block w-80" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://proyectomer.com/wp-content/uploads/2018/07/3-2-600x400.jpg" className="d-block w-80" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
