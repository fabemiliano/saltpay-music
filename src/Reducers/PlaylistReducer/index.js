export const initialState = {
  playlist: [],
};

function createNewEntry(state, action, type) {
  const playlistToUpdate = state.playlist.find((e) => e.id === action.state.playlistId);
  if (type === 'remove') {
    const filteredSongs = state.playlist.find((e) => e.id === action.state.playlistId).songs
      .filter((e) => e !== action.state.songId);

    playlistToUpdate.songs = filteredSongs;
    return playlistToUpdate;
  }

  playlistToUpdate.songs = [...playlistToUpdate.songs, action.state.songId];
  return playlistToUpdate;
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return { ...state, playlist: [...state.playlist, action.state] };
    case 'REMOVE_PLAYLIST':
      return { ...state, playlist: state.playlist.filter((e) => e.id !== action.state) };
    case 'REMOVE_SONG_FROM_PLAYLIST':
      return {
        ...state,
        playlist:
          [...state.playlist.filter((e) => e.id !== action.state.playlistId),
          createNewEntry(state, action, 'remove')],
      };
    case 'ADD_SONG_TO_PLAYLIST':
      return {
        ...state,
        playlist:
          [...state.playlist.filter((e) => e.id !== action.state.playlistId),
          createNewEntry(state, action, 'add')],
      };
    default: return state;
  }
};

export default playlistReducer;
