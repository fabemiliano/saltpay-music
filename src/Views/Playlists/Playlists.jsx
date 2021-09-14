import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreatePlaylist from '../../Components/createPlaylist/CreatePlaylist';
import PlaylistModal from '../../Components/playlistModal/PlaylistModal';
import AccessDenied from '../AccessDenied/AccessDenied';
import styles from './Playlists.module.scss';

function Playlists({
  playlists, allSongs, logged, isPro,
}) {
  const [showModal, setShowModal] = useState(false);
  const [playlistId, setPlaylistId] = useState(null);

  const { t } = useTranslation();

  return (
    <div className={styles.playlists}>
      <h1>{t('playlists.title')}</h1>
      {logged && isPro && (
        <div>
          <CreatePlaylist />
          <div className={styles.playlistsCreated}>
            {playlists.map(({ playlistName, songs, id }) => (
              <div className={styles.playlistCreated} onClick={() => { setShowModal(true); setPlaylistId(id); }}>
                <div>
                  <div>
                    <img src={allSongs.find((e) => e.id.attributes['im:id'] === songs[0])['im:image'][0].label} />
                    <img src={allSongs.find((e) => e.id.attributes['im:id'] === songs[1])['im:image'][0].label} />
                  </div>
                  <div>
                    <img src={allSongs.find((e) => e.id.attributes['im:id'] === songs[2])['im:image'][0].label} />
                    <img src={allSongs.find((e) => e.id.attributes['im:id'] === songs[3])['im:image'][0].label} />
                  </div>
                </div>
                <p>{playlistName}</p>
              </div>
            ))}
          </div>
          {showModal && <PlaylistModal props={{ setShowModal, playlistId }} />}
        </div>
      )}
      {
        (!logged || !isPro) && <AccessDenied />
      }
    </div>

  );
}

const mapStateToProps = (state) => ({
  playlists: state.playlistReducer.playlist,
  allSongs: state.songReducer.songs.feed.entry,
  logged: state.loginReducer.logged,
  isPro: state.loginReducer.isPro,

});

export default connect(mapStateToProps)(Playlists);
