import axios from "axios";

export const getCountryData = async (countryName) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    const country = response.data[0];

    return {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      region: country.region,
      population: country.population,
      area: country.area,
      currency: country.currencies
        ? Object.values(country.currencies)[0].name
        : "N/A",
    };

  } catch (error) {
    if (error.response) {
      throw new Error(
        `Country API Error: ${error.response.status} - ${error.response.statusText}`
      );
    }

    throw new Error("Network error while fetching country data");
  }
};