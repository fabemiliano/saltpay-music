import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Details from '../../Components/details/Details';

let add = 20;

export function viewMoreSongs(songsToShow, setSongsToShow) {
  add += 20;
  const songs = songsToShow.slice(0, add);
  setSongsToShow(songs);
}

export function cropName(name) {
  if (name.length > 30) {
    return `${name.slice(0, 30)}...`;
  }
  return name;
}

function Home({ songs }) {
  const [songsToShow, setSongsToShow] = useState();
  const [typedSong, setTypedSong] = useState('');
  const [details, setDetails] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    setSongsToShow(songs.slice(0, 20));
  }, [songs]);

  useEffect(() => {
    setSongsToShow(songs.filter((e) => e['im:artist'].label.toLowerCase().includes(typedSong.toLocaleLowerCase())
      || e['im:name'].label.toLowerCase().includes(typedSong.toLocaleLowerCase())));
    if (typedSong.length === 0) {
      setSongsToShow(songs.slice(0, 20));
    }
  }, [typedSong]);

  return (
    <div data-testid="home" className={styles.home}>
      <SearchBar getTypedSong={setTypedSong} />
      <div className={styles.container}>
        {songsToShow && songsToShow.length === 0 && <h1>No results</h1>}
        {songsToShow && songs.length > 0 && songsToShow.map((e) => (
          <div onClick={() => setDetails(e)} className={styles.box}>
            <img src={e['im:image'][2].label} alt="cover" />
            <p>{cropName(e['im:name'].label)}</p>
            <p>{cropName(e['im:artist'].label)}</p>
          </div>
        ))}
      </div>
      {typedSong === ''
        && <button data-testid="show-more" type="button" className="medium-button" onClick={() => viewMoreSongs(songs, setSongsToShow)}>{t('home.show-more-button')}</button>}
      {details && <Details props={{ details, setDetails }} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  songs: state.songReducer.songs.feed.entry,
});

export default connect(mapStateToProps)(Home);
