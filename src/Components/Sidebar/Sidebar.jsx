import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './Sidebar.module.scss';
import logo from '../../Assets/imgs/logo.png';

function Sidebar({ logged, isPro }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.sidebar}>

      <div onClick={() => history.push('/')} className={styles.logo}>
        <img  src={logo} alt="logo" />
        <h1>music</h1>

      </div>
      <ul>
        <Link to="/">
          <i className="icon-home3" />
          <p>{t('sidebar.home')}</p>
        </Link>

        {logged && isPro && (
          <Link to="/favourites">
            <i className="icon-star-full" />
            <p>{t('sidebar.favourites')}</p>
          </Link>
        )}
        {logged && isPro && (
          <Link to="/playlists">
            <i className="icon-star-full" />
            <p>{t('sidebar.playlists')}</p>
          </Link>
        )}

        <Link to="/settings">
          <i className="icon-cogs" />
          <p>{t('sidebar.settings')}</p>
        </Link>

      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  logged: state.loginReducer.logged,
  isPro: state.loginReducer.isPro,

});

export default connect(mapStateToProps)(Sidebar);
