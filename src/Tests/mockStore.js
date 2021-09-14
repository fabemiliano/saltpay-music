const mockStore = {
  songs: {
    feed: { entry: [] },
  },
  error: false,
  loading: null,
  currencies: [
    { code: 'BGN', value: 1.6533, img: 'https://restcountries.eu/data/bgr.svg' },
    { code: 'NOK', valu: 8.687, img: 'https://restcountries.eu/data/nor.svg' },
  ],
  selectedCurrency: 'USD',
  conversion: 1,
  favouriteIds: [],
  logged: true,
  isPro: true,
  playlist: [],
};

export default mockStore;
