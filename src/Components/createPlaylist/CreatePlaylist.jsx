import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreatePlaylistModal from '../CreatePlaylistModal/CreatePlaylistModal';
import styles from './CreatePlaylist.module.scss';

function CreatePlaylist() {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.createplaylist}>
      <button className="medium-button" type="button" onClick={() => setShowPlaylistModal(true)}>{t('playlists.create-playlist')}</button>
      {showPlaylistModal && <CreatePlaylistModal createPlaylistModal={setShowPlaylistModal} />}
    </div>
  );
}

export default CreatePlaylist;
