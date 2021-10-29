import { FC } from 'react';

import Header from '../../components/Header/Header';
import CandidatesList from './pages/candidatesList/CandidatesList';
import styles from './styles.module.scss';

const Main: FC = () => {
  return (
    <div className={styles['main']}>
      <Header className={styles['main__header']} />
      <CandidatesList />
    </div>
  );
};

export default Main;
