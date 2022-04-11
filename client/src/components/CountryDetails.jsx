import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getCountriesDetail } from "../redux/Action"
import Activity from './Activity';
import { Link } from 'react-router-dom';

import style from './CountryDetails.module.css'

const DetailCountry = () => {
    const countriesDetail = useSelector(state => state.countriesDetail)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getCountriesDetail(id))
    },[dispatch])
    return (
        <div className={style.windowContainer} >
            <div className={style.linkcontainer}>
                <Link className={style.link} to='/home'>Home</Link>
            </div>
            <div className={style.container}>
                <h5>id: {countriesDetail.id}</h5>
                <h1>Name: {countriesDetail.name}</h1>
                <img src = {countriesDetail.flags} alt="no image" style={{width:300}}/>
                <h3>Continent: {countriesDetail.continents}</h3>
                <h3>Subregion: {countriesDetail.subregion}</h3>
                <h3>Capital: {countriesDetail.capital}</h3>
                <h4>Area: {countriesDetail.area} Km2</h4>
                <h4>Population: {countriesDetail.population}</h4>
                <hr/>
                <Activity countryName={countriesDetail.name} activities={countriesDetail.Activities}/>
            </div>
        </div>
    )
}
export default DetailCountry;