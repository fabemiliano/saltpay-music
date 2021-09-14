export const initialState = {
  songs: {
    feed: { entry: [] },
  },
  error: false,
  loading: null,
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CACHE_SONGS':
      return { ...state, songs: action.state };
    case 'API_ERROR':
      return { ...state, error: true };
    case 'LOADING_DATA':
      return { ...state, loading: true };
    case 'DATA_LOADED':
      return { ...state, loading: false };
    default: return state;
  }
};

export default songReducer;
