import { FC } from 'react';

import PhotoExample from '../../../img/candidate.jpg';
import styles from './styles.module.scss';

export interface CandidateModel {
  id: number;
  surname: string;
  name: string;
  consigment: string;
}

interface PhotoItemProps {
  candidate: CandidateModel;
}

const PhotoItem: FC<PhotoItemProps> = (props) => {
  const { surname, name, consigment, id } = props.candidate;
  return (
    <div className={styles['photo-item']}>
      <img
        src={PhotoExample}
        alt={`${id}_${surname}`}
        className={styles['photo-item__img']}
      />
      <h2 className={styles['photo-item__surname']}>{surname}</h2>
      <p className={styles['photo-item__name']}> {name}</p>
      <p className={styles['photo-item__consigment']}>«{consigment}»</p>
    </div>
  );
};

export default PhotoItem;
