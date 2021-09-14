import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { setCurrency } from '../../Actions/ExchangeActions';
import { signOut } from '../../Actions/LoginActions';
import styles from './Settings.module.scss';

function saveLanguageinLocalStorage(language) {
  localStorage.setItem('language', language);
}

function showLanguages(i18n) {
  return (
    <div className={styles.languages}>
      <button className="medium-button" type="button" onClick={() => { i18n.changeLanguage('en'); saveLanguageinLocalStorage('en'); }}>EN</button>
      <button className="medium-button" type="button" onClick={() => { i18n.changeLanguage('pt'); saveLanguageinLocalStorage('pt'); }}>PT</button>
    </div>
  );
}

function showCurrencies(currencies, selectCurrency, selectedCurrency, t) {
  return (
    <div>
      <div className={styles.currencies}>

        {currencies.map(({ code, img }) => (
          <div onClick={() => selectCurrency(code)}>
            <img src={img} width="30px" alt={code} />
            <p>{code}</p>
          </div>
        ))}
      </div>
      <h1>{`${t('settings.currency-selected')}: ${selectedCurrency}`}</h1>
    </div>
  );
}

function Settings({
  currencies, selectCurrency, selectedCurrency, doSingOut, logged,
}) {
  const [page, setPage] = useState('');
  const { t, i18n } = useTranslation();
  const history = useHistory();
  return (
    <div className={styles.settings}>
      <h1>{t('settings.title')}</h1>
      <div className={styles.secondary}>
        <div className={styles.options}>
          <p onClick={() => setPage('language')}><i className="icon-earth"/>{t('settings.choose-language')}</p>
          <p onClick={() => setPage('currency')}><i className="icon-coin-dollar"/>{t('settings.choose-currency')}</p>
          {logged && <p onClick={() => { history.push('/'); doSingOut(); }}><i className="icon-exit"/>{t('settings.sign-out')}</p>}
        </div>
        <div>
          {page === 'language' && showLanguages(i18n)}
          {page === 'currency' && showCurrencies(currencies, selectCurrency, selectedCurrency, t)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.currenciesReducer.currencies,
  selectedCurrency: state.currenciesReducer.selectedCurrency,
  logged: state.loginReducer.logged,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (currency) => dispatch(setCurrency(currency)),
  doSingOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
