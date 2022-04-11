const axios = require("axios");

const ApiCall = async () => {
  let resultado;
  try {
    const pedido = await axios.get("https://restcountries.com/v3/all");
    if (pedido) {
      resultado = pedido.data.map((c) => {
        let capital;
        if (!c.capital) {
          capital = "Este pais no tiene capital";
        } else if (c.capital.length === 1) {
          capital = c.capital.join(" ");
        } else if (c.capital.length > 1) {
          capital = c.capital.join(", ");
        }
        return {
          id: c.cca3,
          name: c.name.common,
          flags: c.flags[1],
          continents: c.region,
          capital,
          subregion: c.subregion,
          area: c.area,
          population: c.population,
        };
        
      });
      console.log(resultado)
      return resultado;
      
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = ApiCall; 