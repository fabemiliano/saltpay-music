import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addFavourite, removeFavourite } from '../../Actions/FavouriteActions';
import AccessDenied from '../AccessDenied/AccessDenied';
import styles from './Favourites.module.scss';

function Favourites({
  favouritesArray, songs, removeSongFromFavourites, logged, isPro,
}) {
  const songsFiltered = favouritesArray.map((e) => songs.find((el) => el.id.attributes['im:id'] === e));

  const { t } = useTranslation();

  return (
    <div className={styles.favourites}>
      <h1>{t('favourites.title')}</h1>
      {logged && isPro && (
        <div>
          <div>
            {songsFiltered.map((e) => (
              <div>
                <img src={e['im:image'][2].label} alt="cover" />
                <p>{e['im:name'].label}</p>
                <p>{e['im:artist'].label}</p>
                <i onClick={() => removeSongFromFavourites(e.id.attributes['im:id'])} className="icon-star-full" />
              </div>
            ))}
          </div>
        </div>
      )}
      {
        (!logged || !isPro) && <AccessDenied />
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  favouritesArray: state.favouritesReducer.favouriteIds,
  songs: state.songReducer.songs.feed.entry,
  logged: state.loginReducer.logged,
  isPro: state.loginReducer.isPro

});

const mapDispatchToProps = (dispatch) => ({
  addSongToFavourites: (id) => dispatch(addFavourite(id)),
  removeSongFromFavourites: (id) => dispatch(removeFavourite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
