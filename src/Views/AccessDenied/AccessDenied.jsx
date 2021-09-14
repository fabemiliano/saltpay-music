import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AccessDenied.module.scss';

function AccessDenied() {
  const { t } = useTranslation();

  return (
    <div className={styles.accessDenied}>
      <h1>
        {t('access-denied.message')}
      </h1>
      <Link to="/login"><button className="small-button">{t('access-denied.button1')}</button></Link>
      <Link to="/"><button className="small-button">{t('access-denied.button2')}</button></Link>
    </div>
  );
}

export default AccessDenied;
