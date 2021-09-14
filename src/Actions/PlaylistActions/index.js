import * as consts from '../consts';

export const addPlaylist = (state) => ({ type: consts.ADD_PLAYLIST, state });

export const removePlaylist = (state) => ({ type: consts.REMOVE_PLAYLIST, state });

export const removeSongFromPlaylist = (state) => (
  { type: consts.REMOVE_SONG_FROM_PLAYLIST, state }
);

export const addSongToPlaylist = (state) => ({ type: consts.ADD_SONG_TO_PLAYLIST, state });
