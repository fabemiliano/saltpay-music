export const initialState = {
  favouriteIds: [],
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      return { ...state, favouriteIds: [...state.favouriteIds, action.state] };
    case 'REMOVE_FAVOURITE':
      return { ...state, favouriteIds: state.favouriteIds.filter((e) => e !== action.state) };
    default: return state;
  }
};

export default songReducer;
