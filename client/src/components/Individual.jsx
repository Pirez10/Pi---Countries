import React from "react";
import styles from "./Individual.module.css"

export default function Individual({id,name, continents, flags}){
  return(
      <div className={styles.card}>
        <div key={id}></div>          
        <h2>{name}</h2>
        <img className={styles.img} src={flags} alt="no hay imagen" width="200px" heigth="250"/>
        <h4>{continents}</h4>

      </div>
  )
}