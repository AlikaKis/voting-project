import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import FormButton from '../FormButton/FormButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ResultItem, { ResultModel } from './ResultItem/ResultItem';
import styles from './styles.module.scss';

interface PhotosListProps {
  className?: string;
}

const mockData = [
  {
    id: 1,
    surname: 'Иванов',
    name: 'Иван',
    result: Math.random(),
  },
  {
    id: 2,
    surname: 'Иванов',
    name: 'Иван',
    result: Math.random(),
  },
  {
    id: 3,
    surname: 'Иванов',
    name: 'Иван',
    result: Math.random(),
  },
  {
    id: 4,
    surname: 'Иванов',
    name: 'Иван',
    result: Math.random(),
  },
  {
    id: 5,
    surname: 'Иванов',
    name: 'Иван',
    result: Math.random(),
  },
];

const ResultsList: FC<PhotosListProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [results, setResults] = useState<ResultModel[]>([]);
  const [isMobileScreen, setMobileScreen] = useState(
    document.documentElement.clientWidth <= 1024,
  );
  const { width } = useWindowDimensions();
  const fetchCandidates = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(mockData);
      setIsLoading(false);
      setIsError(false);
    }, 1000);
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (width <= 1300 && !isMobileScreen) {
      setMobileScreen(true);
    } else if (width > 1300 && isMobileScreen) {
      setMobileScreen(false);
    }
  }, [width]);

  return (
    <div
      className={classNames(
        styles['results-list'],
        isError || isLoading ? styles['results-list_empty'] : null,
        className ? className : null,
      )}>
      {isLoading ? (
        <LoadingSpinner className={styles['results-list__loader']} isPrimaryColor />
      ) : isError ? (
        <div className={styles['results-list__error']}>
          <span className={styles['error-text']}>Произошла ошибка</span>
          <FormButton
            type="button"
            disabled={false}
            className={styles['error-btn']}
            onClick={fetchCandidates}>
            Попробовать ещё раз
          </FormButton>
        </div>
      ) : (
        results
          .sort((a, b) => {
            if (a.result > b.result) {
              return -1;
            }
            if (a.result < b.result) {
              return 1;
            }
            return 0;
          })
          .map((item) => (
            <ResultItem key={item.id} result={item} isMobileScreen={isMobileScreen} />
          ))
      )}
    </div>
  );
};

export default ResultsList;
