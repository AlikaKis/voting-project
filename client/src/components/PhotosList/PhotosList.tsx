import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import FormButton from '../FormButton/FormButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PhotoItem, { CandidateModel } from './PhotoItem/PhotoItem';
import styles from './styles.module.scss';

interface PhotosListProps {
  className?: string;
}

const mockData = [
  {
    id: 1,
    surname: 'Иванов',
    name: 'Иван Иванович',
    consigment: 'Новые люди',
  },
  {
    id: 2,
    surname: 'Иванов',
    name: 'Иван Иванович',
    consigment: 'Новые люди',
  },
  {
    id: 3,
    surname: 'Иванов',
    name: 'Иван Иванович',
    consigment: 'Новые люди',
  },
  {
    id: 4,
    surname: 'Иванов',
    name: 'Иван Иванович',
    consigment: 'Новые люди',
  },
  {
    id: 5,
    surname: 'Иванов',
    name: 'Иван Иванович',
    consigment: 'Новые люди',
  },
];

const PhotosList: FC<PhotosListProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [candidates, setCandidates] = useState<CandidateModel[]>([]);
  const fetchCandidates = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCandidates(mockData);
      setIsLoading(false);
      setIsError(false);
    }, 1000);
  };
  useEffect(() => {
    fetchCandidates();
  }, []);
  return (
    <div
      className={classNames(
        styles['photo-list'],
        isError || isLoading ? styles['photo-list_empty'] : null,
        className ? className : null,
      )}>
      {isLoading ? (
        <LoadingSpinner className={styles['photo-list__loader']} isPrimaryColor />
      ) : isError ? (
        <div className={styles['photo-list__error']}>
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
        candidates.map((item) => <PhotoItem key={item.id} candidate={item} />)
      )}
    </div>
  );
};

export default PhotosList;
