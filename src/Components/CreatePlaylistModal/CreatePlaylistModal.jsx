import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import styles from './CreatePlaylistModal.module.scss';
import { addPlaylist } from '../../Actions/PlaylistActions';

function titlePage(playlistName, setPlaylistName, setPage, t) {
  return (
    <div>

      <input className="search-input" type="text" onKeyPress={(e) => e.key === 'Enter' && setPage('addSongs')} onChange={(e) => setPlaylistName(e.target.value)} placeholder={t('playlists.playlist-name')} value={playlistName} />

      {playlistName.length > 0 && <button className="circular-button" type="button" onClick={() => setPage('addSongs')}><i className="icon-arrow-right" /></button>}
    </div>
  );
}

function selectSongs(songs, playlistName, songsIdToAddToPlaylist, setSongsIdToAddToPlaylist, addNewPlaylist, createPlaylistModal, t) {
  const addToPlaylist = (id) => {
    setSongsIdToAddToPlaylist([...songsIdToAddToPlaylist, id]);
  };

  const removefromPlaylist = (id) => {
    setSongsIdToAddToPlaylist(songsIdToAddToPlaylist.filter((e) => e !== id));
  };

  const isSongInPlaylist = (id) => songsIdToAddToPlaylist.find((e) => e === id);

  const savePlaylistData = () => {
    const playlist = {
      playlistName,
      id: v4(),
      songs: songsIdToAddToPlaylist,
    };
    addNewPlaylist(playlist);
    createPlaylistModal(false);
  };

  return (
    <div>
      <h1>{playlistName}</h1>
      {songsIdToAddToPlaylist.length === 0 && (
        <p>{`${t('playlists.select-least')} 4 ${t('playlists.songs')}`}</p>
      )}
      {songsIdToAddToPlaylist.length > 0 && songsIdToAddToPlaylist.length < 4 && <p>{`${t('playlists.select-more')} ${4 - songsIdToAddToPlaylist.length} ${t('playlists.songs')}`}</p>}
      <div className={styles.songscontainer}>
        {songs.map((e) => (
          <div>
            {!isSongInPlaylist(e.id.attributes['im:id']) && <i onClick={() => addToPlaylist(e.id.attributes['im:id'])} className="icon-plus" />}
            {isSongInPlaylist(e.id.attributes['im:id']) && <i onClick={() => removefromPlaylist(e.id.attributes['im:id'])} className="icon-cross" />}
            <img src={e['im:image'][0].label} alt="cover" />
            <p>{e['im:name'].label}</p>
          </div>
        ))}
      </div>
      {songsIdToAddToPlaylist.length > 3 && <button className="medium-button" onClick={() => savePlaylistData()} type="button">{t('playlists.create-playlist')}</button>}
    </div>

  );
}

function CreatePlaylistModal({ songs, createPlaylistModal, addNewPlaylist }) {
  const [playlistName, setPlaylistName] = useState('');
  const [page, setPage] = useState('title');
  const [songsIdToAddToPlaylist, setSongsIdToAddToPlaylist] = useState([]);
  const { t } = useTranslation();

  return (
    <div className={styles.createplaylistmodal}>
      <div className={styles.cover} />
      <div className={styles.box}>
        <button className="circular-button" type="button" onClick={() => createPlaylistModal(false)}><i className="icon-cross" /></button>
        {page === 'title' && titlePage(playlistName, setPlaylistName, setPage, t)}
        {page === 'addSongs' && selectSongs(songs, playlistName, songsIdToAddToPlaylist, setSongsIdToAddToPlaylist, addNewPlaylist, createPlaylistModal, t)}

      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  songs: state.songReducer.songs.feed.entry,
});

const mapDispatchToProps = (dispatch) => ({
  addNewPlaylist: (playlist) => dispatch(addPlaylist(playlist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistModal);
