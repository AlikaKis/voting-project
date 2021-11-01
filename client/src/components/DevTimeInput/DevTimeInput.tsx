import { FC, useContext, useEffect, useState } from 'react';

import TimeContext from '../../context/timeContext';
import styles from './styles.module.scss';

const DevTimeInput: FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const { setCustomTime, clearCustomTime } = useContext(TimeContext);
  useEffect(() => {}, []);
  return (
    <div className={styles['dev-time']}>
      <label htmlFor="hours">
        часы{' '}
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value as unknown as number)}
        />
      </label>

      <label htmlFor="minutes">
        минуты{' '}
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value as unknown as number)}
        />
      </label>
      <button onClick={() => setCustomTime(hours, minutes)}>Изменить</button>
      <button
        onClick={() => {
          clearCustomTime();
          setHours(0);
          setMinutes(0);
        }}>
        Очистить
      </button>
    </div>
  );
};

export default DevTimeInput;
