import classNames from 'classnames';
import { FC, FormEvent, useContext, useEffect, useState } from 'react';

import TimeContext from '../../context/timeContext';
import styles from './styles.module.scss';

const DevTimeInput: FC = () => {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [isDevUsing, setIsDevUsing] = useState(false);
  const { setCustomTime, clearCustomTime, time } = useContext(TimeContext);
  useEffect(() => {
    let savedHours = localStorage.getItem('devTimeHours');
    let savedMinutes = localStorage.getItem('devTimeMinutes');
    let realTimeSeconds = localStorage.getItem('devRealTimeSeconds');
    if (savedHours && savedMinutes && realTimeSeconds) {
      setCustomTime(
        parseInt(savedHours, 10),
        parseInt(savedMinutes, 10),
        parseInt(realTimeSeconds, 10),
      );
      setIsDevUsing(true);
    }
  }, []);

  useEffect(() => {
    if (isDevUsing) {
      setHours(time.hours.toString());
      setMinutes(time.minutes.toString());
    }
  }, [isDevUsing, time]);

  return (
    <form
      className={classNames(
        styles['dev-time'],
        isDevUsing ? styles['dev-time_using'] : null,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        setCustomTime(
          parseInt(hours, 10),
          parseInt(minutes, 10),
          Math.floor(new Date().getTime() / 1000),
        );
        setIsDevUsing(true);
        localStorage.setItem('devTimeHours', hours.toString());
        localStorage.setItem('devTimeMinutes', minutes.toString());
        localStorage.setItem(
          'devRealTimeSeconds',
          Math.floor(new Date().getTime() / 1000).toString(),
        );
      }}>
      <label htmlFor="hours">
        часы{' '}
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setHours(e.currentTarget.value);
          }}
          required
        />
      </label>

      <label htmlFor="minutes">
        минуты{' '}
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={(e: FormEvent<HTMLInputElement>) => setMinutes(e.currentTarget.value)}
          required
        />
      </label>
      <button type="submit">Изменить</button>
      <button
        type="button"
        onClick={() => {
          clearCustomTime();
          setHours('0');
          setMinutes('0');
          setIsDevUsing(false);
          localStorage.removeItem('devTimeHours');
          localStorage.removeItem('devTimeMinutes');
          localStorage.removeItem('devRealTimeSeconds');
        }}>
        Очистить
      </button>
      {isDevUsing ? <small>Используются тестовые значения!</small> : null}
    </form>
  );
};

export default DevTimeInput;
