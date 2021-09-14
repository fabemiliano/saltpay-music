import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './SignLogin.module.scss';

function SignLogIn() {
  const { t } = useTranslation();

  return (
    <div className={styles.singlogin}>
      <div>
        <Link to="/signIn"><button className="small-button">{t('header.signin')}</button></Link>
        <Link to="/logIn"><button className="small-button">{t('header.login')}</button></Link>
      </div>
    </div>
  );
}

export default SignLogIn;
