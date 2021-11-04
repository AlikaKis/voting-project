import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import FormButton from '../FormButton/FormButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './styles.module.scss';
import TurnoutItem, { TurnoutModel } from './TurnoutItem/TurnoutItem';

interface TurnoutListProps {
  className?: string;
}

const mockData: TurnoutModel[] = [
  {
    id: 1,
    district: 'ЦАО',
    turnout: Math.random(),
  },
  {
    id: 2,
    district: 'САО',
    turnout: Math.random(),
  },
  {
    id: 3,
    district: 'СВАО',
    turnout: Math.random(),
  },
  {
    id: 4,
    district: 'ВАО',
    turnout: Math.random(),
  },
  {
    id: 5,
    district: 'ЮВАО',
    turnout: Math.random(),
  },
  {
    id: 6,
    district: 'ЮАО',
    turnout: Math.random(),
  },
  {
    id: 7,
    district: 'ЮЗАО',
    turnout: Math.random(),
  },
  {
    id: 8,
    district: 'ЗАО',
    turnout: Math.random(),
  },
  {
    id: 9,
    district: 'СЗАО',
    turnout: Math.random(),
  },
  {
    id: 10,
    district: 'ЗелАО',
    turnout: Math.random(),
  },
];

const TurnoutList: FC<TurnoutListProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [turnout, setTurnout] = useState<TurnoutModel[]>([]);
  const [isMobileScreen, setMobileScreen] = useState(
    document.documentElement.clientWidth <= 768,
  );
  const { width } = useWindowDimensions();
  const fetchTurnout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTurnout(mockData);
      setIsLoading(false);
      setIsError(false);
    }, 1000);
  };
  useEffect(() => {
    fetchTurnout();
  }, []);

  useEffect(() => {
    if (width <= 768 && !isMobileScreen) {
      setMobileScreen(true);
    } else if (width > 768 && isMobileScreen) {
      setMobileScreen(false);
    }
  }, [width]);
  return (
    <div
      className={classNames(
        styles['turnout-list'],
        isError || isLoading ? styles['turnout-list_empty'] : null,
        className ? className : null,
      )}>
      {isLoading ? (
        <LoadingSpinner className={styles['turnout-list__loader']} isPrimaryColor />
      ) : isError ? (
        <div className={styles['turnout-list__error']}>
          <span className={styles['error-text']}>Произошла ошибка</span>
          <FormButton
            type="button"
            disabled={false}
            className={styles['error-btn']}
            onClick={fetchTurnout}>
            Попробовать ещё раз
          </FormButton>
        </div>
      ) : (
        turnout.map((item) => (
          <TurnoutItem key={item.id} turnoutInfo={item} isMobileScreen={isMobileScreen} />
        ))
      )}
    </div>
  );
};

export default TurnoutList;
