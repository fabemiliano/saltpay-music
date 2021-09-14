import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PageNotFound.module.scss';

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.pageNotFound}>
      <h1>
        {t('not-found.message')}
      </h1>
      <Link to="/"><button className="medium-button">{t('not-found.button2')}</button></Link>
    </div>
  );
}

export default PageNotFound;
