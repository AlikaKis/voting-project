import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import PhotosList from '../../../../components/PhotosList/PhotosList';
import styles from './styles.module.scss';

const CandidatesList: FC = () => {
  const [areasInfo] = useState({
    isOpenedCount: 1124,
    peopleCount: 10234333,
  });
  const beautyNumber = (value: number) => {
    return ('' + value)
      .split('')
      .reverse()
      .reduce((prev, current, index) => {
        return index % 3 === 0 && index !== 0
          ? '' + prev + ' ' + current
          : '' + prev + current;
      })
      .split('')
      .reverse()
      .join('');
  };
  useEffect(() => {}, []);

  return (
    <div className={styles['candidates']}>
      <div
        className={classNames(
          styles['candidates__voting-areas'],
          styles['voting-areas'],
        )}>
        <div className={styles['voting-areas__info-block']}>
          <span className={styles['voting-areas__name']}>Участков открыто</span>
          <div className={styles['voting-areas__value']}>
            {beautyNumber(areasInfo.isOpenedCount)}
          </div>
        </div>
        <div className={styles['voting-areas__info-block']}>
          <span className={styles['voting-areas__name']}>Число жителей на участках</span>
          <div className={styles['voting-areas__value']}>
            {beautyNumber(areasInfo.peopleCount)}
          </div>
        </div>
      </div>
      <PhotosList className={styles['candidates__candidates-list']} />
    </div>
  );
};

export default CandidatesList;
