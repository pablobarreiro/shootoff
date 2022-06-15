import "../styles/cards.css"
import React from "react"
const Pagination = ({ totalProducts, productsPerPage, paginate }) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className='btn btn-dark btn-pagination' >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination