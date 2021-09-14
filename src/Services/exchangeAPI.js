import axios from 'axios';
import currencyFlags from '../Utils/currencyFlags';

// the api requires a key which should be stored in an enviroment variable, since such variables
// are ignored when pushing the commit, the key was exposed so the app can run when the repository
// is cloned

const key = process.env.REACT_APP_API_KEY || '1953d60501dca42f49061336';

function treatResults(currencies) {
  const availableCurrencies = Object.keys(currencyFlags);
  return availableCurrencies.map((e) => ({ code: e, value: currencies[e], img: currencyFlags[e] }));
}

const getRates = async () => {
  const { data } = await axios.get(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);
  return treatResults(data.conversion_rates);
};

export default getRates;
