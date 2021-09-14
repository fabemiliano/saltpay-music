import api from '../../Services/itunesApi';
import * as consts from '../consts';

const cacheSongs = (state) => ({ type: consts.CACHE_SONGS, state });

const loading = () => ({ type: consts.LOADING_DATA });

const dataLoaded = () => ({ type: consts.DATA_LOADED });

const apiError = () => ({ type: consts.API_ERROR });

const fetchSongs = async (dispatch) => {
  try {
    dispatch(loading());
    const response = await api();
    dispatch(cacheSongs(response));
    dispatch(dataLoaded());
  } catch (err) {
    dispatch(apiError());
  }
};

export default fetchSongs;
