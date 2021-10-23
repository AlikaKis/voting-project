import classNames from 'classnames';
import { FC } from 'react';

import styles from './styles.module.css';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={classNames(styles['spinner'], className ? className : null)}></div>
  );
};

export default LoadingSpinner;
