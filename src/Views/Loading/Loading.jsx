import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Loading.module.scss';

function Loading() {
  const { t } = useTranslation();

  return (
    <div className={styles.loading}>
      <h1>Loading....</h1>
    </div>
  );
}

export default Loading;
