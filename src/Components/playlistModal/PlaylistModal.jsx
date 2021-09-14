import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './PlaylistModal.module.scss';
import { removeSongFromPlaylist, removePlaylist } from '../../Actions/PlaylistActions';

function PlaylistModal({
  props, allPlaylists, allSongs, removeUniqueSong, deletePlaylist,
}) {
  const { playlistId, setShowModal } = props;

  const { t } = useTranslation();

  const playlistSelected = allPlaylists.find(({ id }) => id === playlistId);

  const songsInPlaylist = playlistSelected.songs;

  const filteredSongs = songsInPlaylist.map((e) => allSongs.find((el) => el.id.attributes['im:id'] === e));

  return (
    <div className={styles.songscontainer}>
      <div className={styles.cover} />
      <div className={styles.box}>
        <h1>{playlistSelected.playlistName}</h1>
        <div>
          {filteredSongs.map((e) => (
            <div>
              {filteredSongs.length > 4 && <i onClick={() => removeUniqueSong(e.id.attributes['im:id'], playlistId)} className="icon-cross" />}
              <img src={e['im:image'][0].label} alt="cover" />
              <p>{e['im:name'].label}</p>
            </div>
          ))}
        </div>
        <button className="medium-button" type="button" onClick={() => { setShowModal(false); deletePlaylist(playlistId); }}>{t('playlists.delete')}</button>
        <button className="circular-button" type="button" onClick={() => setShowModal(false)}><i className="icon-cross" /></button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allPlaylists: state.playlistReducer.playlist,
  allSongs: state.songReducer.songs.feed.entry,
});

const mapDispatchToProps = (dispatch) => ({
  removeUniqueSong: (songId, playlistId) => dispatch(removeSongFromPlaylist({ songId, playlistId })),
  deletePlaylist: (playlistId) => dispatch(removePlaylist(playlistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
