import { FC, memo } from 'react';

import TurnoutList from '../../../../components/TurnoutList/TurnoutList';
import styles from './styles.module.scss';

const Turnout: FC = memo(function Turnout() {
  console.log('Turnout render');

  return (
    <div className={styles['turnout']}>
      <h2 className={styles['turnout__header']}>
        Явка на&nbsp;<span className={styles['clock']}>18:00</span>
      </h2>
      <TurnoutList className={styles['turnout__list']} />
    </div>
  );
});

export default Turnout;
