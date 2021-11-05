import { FC, memo, useEffect, useState } from 'react';

import PhotoExample from '../../../img/candidate.jpg';
import styles from './styles.module.scss';

export interface ResultModel {
  id: number;
  surname: string;
  name: string;
  result: number;
}

interface ResultItemProps {
  result: ResultModel;
  isMobileScreen: boolean;
}

const ResultItem: FC<ResultItemProps> = memo(function ResultItem(props) {
  const [style, setStyle] = useState<any>(null);
  const {
    result: { surname, name, result },
    isMobileScreen,
  } = props;
  useEffect(() => {
    setTimeout(() => {
      if (isMobileScreen) {
        setStyle({
          width: `calc( 50% * ${result} )`,
        });
      } else {
        setStyle({
          height: `calc( 20vh * ${result} )`,
        });
      }
    }, 100);
  }, [result, isMobileScreen]);
  return (
    <div className={styles['result-item']}>
      <span className={styles['result-item__percent']}>{Math.floor(result * 100)}%</span>
      <div className={styles['result-item__graph']} style={style}></div>
      <div className={styles['result-item__candidate']}>
        <img
          src={PhotoExample}
          alt={`фото ${surname}`}
          className={styles['result-item__photo']}
        />
        <h2 className={styles['result-item__name']}>
          {name}&nbsp;
          <span className={styles['result-item__name_uppercase']}>{surname}</span>
        </h2>
      </div>
    </div>
  );
});

export default ResultItem;
