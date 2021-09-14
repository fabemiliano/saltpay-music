import api from '../../Services/exchangeAPI';
import * as consts from '../consts';

export const cacheCurrencies = (state) => ({ type: consts.CACHE_CURRENCIES, state });

export const setCurrency = (state) => ({ type: consts.SET_CURRENCY, state });

const apiError = () => ({ type: consts.API_ERROR });

const fetchRates = async (dispatch) => {
  try {
    const response = await api();
    dispatch(cacheCurrencies(response));
  } catch (err) {
    dispatch(apiError());
  }
};

export default fetchRates;
