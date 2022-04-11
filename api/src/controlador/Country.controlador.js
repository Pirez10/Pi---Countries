const axios = require('axios')
const { Country, Activity } = require('../db')
const { Sequelize } = require("sequelize");

const ApiCall = require("../util/ApiCall");


const getAllCountries = async (req, res, next) => {
  try {
    let resultado = await ApiCall();
    const countriesBD = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });

    if (countriesBD.length > 0) {
      res.send(countriesBD);
    } else {
      const countries = await Country.bulkCreate(resultado);
      res.json({ msg: "Carga de paises", countries });
    }
  } catch (e) {
    return next(e);
  }
};

const getCountryId = async (req, res) => {
  const { id } = req.params;
  let newId = id.toUpperCase();
  try {
    let dbId = await Country.findByPk(newId, {
      include: {
        model: Activity,
        attributes: ["id", "name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    res.send(dbId);
  } catch (error) {
    console.log(error);
  }
};

const getCountryName = async (req, res) => {
  let { name } = req.query;

  try {
    let countryName = await Country.findAll({
      where: {
        name: { [Sequelize.Op.iLike]: `%${name}%` },
      },
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (!countryName[0]) {
      return res.json({ msj: "ERROR, Pais no encontrado" });
    }
    res.json(
      countryName,
    );
  } catch (error) {
    console.log(error);
  }
};



async function postTouristActivities(req, res) {
  let { name, difficulty, duration, season, idCountry } = req.body; // elementos para crear tu tabla de actividades en BD

  if (!name || !difficulty || !duration || !season || !idCountry) return res.status(404).json({ msg: " falta algun item" })
  else {
    try {
      const newActivities = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        idCountry,
      });


      const countryId = await Country.findAll({
        where: {
          id: idCountry,
        },
      });

      newActivities.addCountry(countryId);
      console.log({ newActivities })
      res.status(200).send(newActivities);
    } catch (error) {
      console.log(error);
    }

  }
};



module.exports = {
  getAllCountries,
  getCountryId,
  getCountryName,
  postTouristActivities,
}