import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Searchbar.module.scss';

function SearchBar({ getTypedSong }) {
  const { t } = useTranslation();

  return (
    <div className={styles.searchbar}>
      <input className="search-input" onChange={(e) => getTypedSong(e.target.value)} type="text" placeholder={t('home.searchbar')} />
    </div>
  );
}

export default SearchBar;
