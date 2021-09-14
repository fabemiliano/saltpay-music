export const initialState = {
  currencies: {},
  selectedCurrency: 'USD',
  conversion: 1,
};

function calculateConversion(currencies, selectedCurrency) {
  return currencies.find((e) => e.code === selectedCurrency).value;
}

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CACHE_CURRENCIES':
      return { ...state, currencies: action.state };
    case 'SET_CURRENCY': return { ...state, selectedCurrency: action.state, conversion: calculateConversion(state.currencies, action.state) };
    default: return state;
  }
};

export default currencyReducer;
