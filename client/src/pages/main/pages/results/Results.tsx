import { FC } from 'react';

import ResultsList from '../../../../components/ResultsList/ResultsList';
import styles from './styles.module.scss';

const Results: FC = () => {
  return (
    <div className={styles['results']}>
      <div className={styles['results__statistics']}>
        <p className={styles['info']}>
          Явка - <span className={styles['info__result']}>64.87%</span>
        </p>
        <p className={styles['info']}>
          Голосов обработано - <span className={styles['info__result']}>42.32%</span>
        </p>
      </div>
      <ResultsList className={styles['results__list']} />
    </div>
  );
};

export default Results;
