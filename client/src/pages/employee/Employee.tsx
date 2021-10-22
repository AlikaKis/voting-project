import { FC } from 'react';

import styles from './styles.module.css';

const Employee: FC = () => {
  return (
    <div className={styles['main']}>
      <p>Сотрудника страница</p>
    </div>
  );
};

export default Employee;
