import {
    GET_COUNTRIES,
    /*     GET_DETAIL, */
    PASC,
    PDES,
    ASC,
    DES,
    BY_CONTINENT,
    GET_COUNTRY_DETAIL,
    GET_COUNTRY,
    FILTER_BY_ACTIVITY,
    /* BY_ACTIVITY, */
    PAISES_NOMBRE,
    GET_ALGO,
    LIMPIAR_DETALLE
} from './Action';


const initialState = {
    countries: [],
    detail: [],
    countriesDetail: /* {} */[],
    todosContinents: [],
    allActivities: [],
    activity: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                todosContinents: action.payload,
                allActivities: action.payload,

            }
        case GET_COUNTRY:
            return {
                ...state,
                countries: action.payload,
            }
        case PAISES_NOMBRE:
            return {
                ...state,
                countries: action.payload,
            };

        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countriesDetail: action.payload
            }
        case ASC:
            return {
                ...state,
                countries: state.countries.slice().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            }
        case DES:
            return {
                ...state,
                countries: state.countries.slice().sort((a, b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))
            }

        case PASC:
            return {
                ...state,
                countries: state.countries.slice().sort((a, b) => (a.population - b.population))
            }
        case PDES:
            return {
                ...state,
                countries: state.countries.slice().sort((a, b) => (a.population - b.population)).reverse()
            }

        case BY_CONTINENT:
            const allContinents = state.todosContinents;
            const continentFilter = action.payload === 'All'? 
            allContinents: 
            allContinents.filter(i => i.continents === action.payload)
            return {
                ...state,
                countries: continentFilter,
            }

        case FILTER_BY_ACTIVITY:
            return {
                ...state,
                countries: state.countries.filter((c) => {
                    return c.Activities?.some((a) => a.name === action.payload)
                })
            }
        case GET_ALGO:
            return {
                ...state,
                countries: action.payload
            }
        case LIMPIAR_DETALLE:
            return {
                ...state,
                detail: [],

            }

        default:
            return state
    }
}

export default reducer;