import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import songReducer from '../Reducers/SongReducer';
import favouritesReducer from '../Reducers/FavouritesReducer';
import playlistReducer from '../Reducers/PlaylistReducer';
import currenciesReducer from '../Reducers/CurrenciesReducer';
import loginReducer from '../Reducers/LoginReducer';

const rootReducer = combineReducers({
  songReducer, favouritesReducer, playlistReducer, currenciesReducer, loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log(store.getState())

export default store;
