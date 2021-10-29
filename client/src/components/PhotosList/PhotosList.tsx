import classNames from 'classnames';
import { FC, useEffect } from 'react';

import styles from './styles.module.scss';

interface PhotosListProps {
  className?: string;
}

const PhotosList: FC<PhotosListProps> = ({ className }) => {
  useEffect(() => {}, []);
  return (
    <div className={classNames(styles['photo-list'], className ? className : null)}>
      <span>Ку</span>
    </div>
  );
};

export default PhotosList;
