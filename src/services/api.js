const getCountryCode = (country) => fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then((data) => data.json());

export { getCountryCode };
