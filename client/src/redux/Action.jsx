import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
/* export const GET_DETAIL = "GET_DETAIL"; */
export const PASC = "CANT_POPULATION_ASCENDENTE";
export const PDES = "CANT_POPULATION_DESCENDENTE";
export const ASC = "ASCENDENTE";
export const DES = "DESCENDENTE";
export const BY_CONTINENT = 'BY_CONTINENT'
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'
export const GET_COUNTRY = 'GET_COUNTRY'
export const FILTER_BY_ACTIVITY/* BY_ACTIVITY */ = /* "BY_ACTIVITY" */'FILTER_BY_ACTIVITY'
export const PAISES_NOMBRE = 'PAISES_NOMBRE'
export const GET_ALGO = 'GET_ALGO'
export const LIMPIAR_DETALLE = "LIMPIAR_DETALLE"





export function getCountries() {
    return async function (dispatch) {
        let countries = await axios.get("http://localhost:3001/country/home")
        return dispatch({
            type: "GET_COUNTRIES",
            payload: countries.data,
        })
    }
}


export function obtenerPaisesNombre(name) {
    return async (dispatch) => {
      let obtener = await axios.get(`http://localhost:3001/country?name=${name}`);
      return dispatch({
        type: PAISES_NOMBRE,
        payload: obtener.data,
      });
    };
  }
// -------------------------------------------------------------------------------------

export function getCountriesDetail(id) {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/country/${id}`)
        dispatch({
            type: GET_COUNTRY_DETAIL,
            payload: res.data
        })
    }
}


//filtar los countris por poblacion
export function sortCountryCANT_PA() {
    return {
        type: PASC
    }
}
export function sortCountryCANT_PD() {
    return {
        type: PDES
    }
}

//filtrar los countris por nombre 
export function sortCountryASC() {
    return {
        type: ASC
    }
}
export function sortCountryDES() {
    return {
        type: DES
    }
}


//filtar por continente
export function byContinent(payload) {
    return {
        type: BY_CONTINENT,
        payload
    }
}

//postear actividad
export function postActivity(activity) {
    return async (dispatch) => {
        await axios.post('http://localhost:3001/country/newactivity', activity)
    }
}

export function filterByActivity/* byActivity */(payload) {
    return {
        type: FILTER_BY_ACTIVITY/* BY_ACTIVITY */,
        payload
    }
}

export let getByName = (name, activity, region, sort) => {
    return async (dispatch) => {

        let response = await axios.get("http://localhost:3001/country/home")
        
        if (activity) {
            response.data = response.data.filter(data => data.Activities.filter(a => a.name === activity).length)
        }
        dispatch({ type: GET_ALGO, payload: response.data })
    }
}


export function limpiardetalle() {
    return {
        type: LIMPIAR_DETALLE
    }

}