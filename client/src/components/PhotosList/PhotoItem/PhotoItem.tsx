import { FC } from 'react';

import PhotoExample from '../../../img/candidate.jpg';
import styles from './styles.module.scss';

interface PhotoItemProps {
  candidate: {
    candidate_id: number;
    candidate: string;
    consigment: string;
  };
}

const PhotoItem: FC<PhotoItemProps> = (props) => {
  const { candidate, consigment, candidate_id } = props.candidate;
  return (
    <div className={styles['photo-item']}>
      <img
        src={PhotoExample}
        alt={`${candidate_id}_${candidate}`}
        className={styles['photo-item__img']}
      />
      <h2 className={styles['photo-item__surname']}>{candidate.split(' ')[0]}</h2>
      <p className={styles['photo-item__name']}>
        {' '}
        {candidate.split(' ').slice(-2).join(' ')}
      </p>
      <p className={styles['photo-item__consigment']}>«{consigment}»</p>
    </div>
  );
};

export default PhotoItem;
