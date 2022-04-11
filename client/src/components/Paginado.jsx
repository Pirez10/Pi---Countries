import React from "react";

import styles from "./Paginado.module.css";

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers &&
                pageNumbers.map(number => (
                    
                        <button className={styles.btna} onClick={() => paginado(number)}> {number} </button>
                        
                    
                ))}
            </ul>
        </nav>
    )
}