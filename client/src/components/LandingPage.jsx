import React from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={styles.InitialPage}>

            <h1 className={styles.title}>Countries of the word</h1>
            
            <Link to="/home">
                <button className={styles.btn}>Get into</button>
            </Link>

        </div>
    )
}