import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Action from "../redux/Action";

import Individual from "./Individual";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import styles from "./Home.module.css";



export default function Home() {
    const dispatch = useDispatch();
    let allCountries = useSelector((state) => state.countries);
    /* let activity = useSelector(state => state.activity) */

    //--------------filtro actividad
    var act = [];

    allCountries.map(data => data.Activities.length && data.Activities.map(activity => activity.name && act.push(activity.name)));

    var uniqs = act.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
    console.log("Unicas Actividades", uniqs);

    let [filter, setFilter] = useState({ name: "", activity: "", region: "", sort: "" });


    useEffect(() => {
        dispatch(Action.getByName(filter.name, filter.activity, filter.region, filter.sort))
    }, [dispatch, filter])

    //---------------------------------------------------------------------------------------

    const [activity, setActivity] = useState("")


    // clase del miercoles (paginado)
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)

    const indexOfLastCountry = currentPage * countriesPerPage //9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 0
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    //1-----0----9
    //2-----10----18

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //---------------------------------------

    useEffect(() => {
        dispatch(Action.getCountries());
        return () => {
            dispatch(Action.limpiardetalle())
        }
        
    }, [dispatch]);


    //Filtro por nombre y poblacion------------
    const handleChangePopulation = (event) => {
        if (event.target.value === Action.PASC) {
            dispatch(Action.sortCountryCANT_PA())
        }
        if (event.target.value === Action.PDES) {
            dispatch(Action.sortCountryCANT_PD())
        }
    }

    const handleChangeOrder = (event) => {
        if (event.target.value === Action.ASC) {
            dispatch(Action.sortCountryASC(allCountries))
        }
        if (event.target.value === Action.DES) {
            dispatch(Action.sortCountryDES(allCountries))
        }
    }
    //---------------------------------------------------------


    function handleContinents(e) {
        e.preventDefault();
        dispatch(Action.byContinent(e.target.value))
        /* setOrder(e.target.value) */
    }
    //-----------------------------------------



    //para buscar por actividad
/*     const setInputHandler = (e) => {
        e.preventDefault()
        dispatch(Action.filterByActivity(activity))

    }

    const inputActivityHandler = (e) => {
        setActivity(e.target.value)
    } */



    return (
        <div>
            <div className={styles.center}>

                <h1>COUNTRIES APP</h1>

                <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />

                {/* ORDERNADO POR NOMBRE */}
                <div className={styles.total}>
                    <a href="/home" >
                        <button className={styles.btna}>refresh</button>

                    </a>

                    <div className={styles.filtersContainer}>
                        <select className={styles.btna} onChange={handleChangeOrder}>
                            <optgroup label="Select an a Order">
                                <option value="none">Order by Alphabet</option>
                                <option value={Action.ASC}>Ascendente</option>
                                <option value={Action.DES}>Descendente</option>
                            </optgroup>
                        </select>

                    </div>

                    {/* ORDERNADO POR POBLACION */}
                    <select className={styles.btna} onChange={handleChangePopulation}>
                        <optgroup label="Select an a Order">
                            <option>Order by Population</option>
                            <option value={Action.PASC}>Ascendente</option>
                            <option value={Action.PDES}>Descendente</option>
                        </optgroup>
                    </select>

                    {/* ORDERNADO POR CONTINENTE*/}
                    <select className={styles.btna} onChange={handleContinents}>
                        <option value='All' key='All'>All continents</option>
                        <option value='Africa' key='Africa'>Africa</option>
                        <option value='Antarctic' key='Antarctic'>Antarctic</option>
                        <option value='Asia' key='Asia'>Asia</option>
                        <option value='Europe' key='Europe'>Europe</option>
                        <option value='Oceania' key='Oceania'>Oceania</option>
                        <option value='Americas' key='Americas'>Americas</option>
                    </select>

                    {/* ORDENADO POR ACTIVIDAD */}

                    <select className={styles.btna} onChange={(e) => setFilter({ ...filter, activity: e.target.value })}>
                        <option value="">All Activities</option>
                        {uniqs.map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>


                    <SearchBar />


                    <Link to="/activities">
                        <button className={styles.btna}>Add Activity</button>
                    </Link>

                </div>
            </div>


            <div className={styles.cards}>
                {currentCountries?.map((c) => (
                    <div key={c.id}>
                        <Link to={`/detail/${c.id}`}>
                            <Individual
                                id={c.id}
                                name={c.name}
                                flags={c.flags}
                                continents={c.continents}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )


}