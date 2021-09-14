import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addFavourite, removeFavourite } from '../../Actions/FavouriteActions';

function doSomething({
  id, favouritesArray, addSongToFavourites, removeSongFromFavourites,
}) {
  if (favouritesArray.includes(id)) {
    removeSongFromFavourites(id);
  } else {
    addSongToFavourites(id);
  }
}

function isAlreadyAFavourite(id, favouritesArray) {
  return favouritesArray.includes(id);
}

function AddToFavourites(props) {
  const {
    id, favouritesArray,
  } = props;
  const { t } = useTranslation();

  return (
    <div>

      <button className="small-button" type="button" onClick={() => doSomething(props)}>
        {isAlreadyAFavourite(id, favouritesArray) && t('details.remove-favourite')}
        {!isAlreadyAFavourite(id, favouritesArray) && t('details.add-favourite')}
        {isAlreadyAFavourite(id, favouritesArray) && <i className="icon-star-full" />}
        {!isAlreadyAFavourite(id, favouritesArray) && <i className="icon-star-empty" />}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  favouritesArray: state.favouritesReducer.favouriteIds,
});

const mapDispatchToProps = (dispatch) => ({
  addSongToFavourites: (id) => dispatch(addFavourite(id)),
  removeSongFromFavourites: (id) => dispatch(removeFavourite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavourites);
