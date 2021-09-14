import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Details.module.scss';
import AddToFavourites from '../addToFavourites/AddToFavourites';
import AddSongToPlaylist from '../AddSongToPlaylist/AddSongToPlaylist';

function getPrice(price, conversion) {
  const newPrice = Number(price.slice(1)) * conversion;
  return newPrice.toFixed(2);
}

function SearchBar({
  props, conversion, selectedCurrency, logged, isPro
}) {
  const { details, setDetails } = props;
  const { t } = useTranslation();

  console.log(isPro)

  return (
    <div className={styles.details}>
      <div className={styles.cover} />

      <div className={styles.box}>
        <button className="circular-button" type="button" onClick={() => setDetails(null)}><i className="icon-cross" /></button>

        <img src={details['im:image'][2].label} alt="cover" />
        <div>
          <p>
            {`${t('details.song')}: ${details['im:name'].label}`}
          </p>
          <p>
            {`${t('details.artist')}:  ${details['im:artist'].label}`}
          </p>
          <p>
            {`${t('details.genre')}: ${details.category.attributes.label}`}
          </p>
          <p>
            {`${t('details.label')}: ${details.rights.label}`}
          </p>
          <p>
            {`${t('details.release')}:  ${details['im:releaseDate'].attributes.label}`}
          </p>
          <p>
            {`${t('details.price')}:  ${selectedCurrency} ${getPrice(details['im:price'].label, conversion)}`}
          </p>
          <div className={styles.buttons}>
            {logged && isPro && <AddToFavourites id={details.id.attributes['im:id']} />}
            {logged && isPro && <AddSongToPlaylist id={details.id.attributes['im:id']} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.currenciesReducer.currencies,
  selectedCurrency: state.currenciesReducer.selectedCurrency,
  conversion: state.currenciesReducer.conversion,
  logged: state.loginReducer.logged,
  isPro: state.loginReducer.isPro,

});

export default connect(mapStateToProps)(SearchBar);
