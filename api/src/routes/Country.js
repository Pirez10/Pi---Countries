const { Router } = require ('express')
// importamos las funciones del controlador
const { 

    getAllCountries, 
    getCountryId,
    getCountryName,
    postTouristActivities,

} = require('../controlador/Country.controlador')

const router = Router();


// GET ALL
router.get('/home', getAllCountries)

// GET ID
router.get('/:id', getCountryId)

//GET NAME
router.get("/", getCountryName);

// POST 
router.post("/newactivity", postTouristActivities);


module.exports = router