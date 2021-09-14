import * as consts from '../consts';

export const addFavourite = (state) => ({ type: consts.ADD_FAVOURITE, state });

export const removeFavourite = (state) => ({ type: consts.REMOVE_FAVOURITE, state });
