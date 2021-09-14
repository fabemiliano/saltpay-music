import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './AddSongToPlaylist.module.scss';
import { addSongToPlaylist } from '../../Actions/PlaylistActions';

function addSongToPlaylistModal(playlists, id, addUniqueSong, showOkMessage, setShowOkMessage, setShowModal, t) {
  return (
    <div className={styles.container}>
      <div className={styles.cover} />
      <div className={styles.box}>
        <button className="circular-button" type="button" onClick={() => setShowModal(false)}><i className="icon-cross" /></button>
        <h1>{t('details.choose-playlist')}</h1>
        {showOkMessage && <p>{`Song added to ${showOkMessage}`}</p>}
        <div className={styles.playlists}>
          {playlists.length === 0 && <h1>{t('playlists.create-new')}</h1>}
          {playlists.map((e) => (
            <button className="medium-button" type="button" onClick={() => { addUniqueSong(id, e.id); setShowOkMessage(e.playlistName); }}>
              <h1>{e.playlistName}</h1>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

function AddSongToFavourites({ id, playlists, addUniqueSong }) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [showOkMessage, setShowOkMessage] = useState(undefined);
  return (
    <div>
      <button className="small-button" type="button" onClick={() => setShowModal(true)}>
        {t('details.add-to-playlist')}

      </button>
      {showModal && addSongToPlaylistModal(playlists, id, addUniqueSong, showOkMessage, setShowOkMessage, setShowModal, t)}
    </div>
  );
}

const mapStateToProps = (state) => ({
  playlists: state.playlistReducer.playlist,
});

const mapDispatchToProps = (dispatch) => ({
  addUniqueSong: (songId, playlistId) => dispatch(addSongToPlaylist({ songId, playlistId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongToFavourites);
