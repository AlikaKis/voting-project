import { FC, memo, useEffect, useState } from 'react';

import styles from './styles.module.scss';

export interface TurnoutModel {
  id: number;
  district: string;
  turnout: number;
}

interface TurnoutItemProps {
  turnoutInfo: TurnoutModel;
  isMobileScreen: boolean;
}

const TurnoutItem: FC<TurnoutItemProps> = memo(function TurnoutItem(props) {
  const [style, setStyle] = useState<any>(null);
  const {
    turnoutInfo: { turnout, district },
    isMobileScreen,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      setStyle({
        width: `calc( ${isMobileScreen ? 35 : 65}% * ${turnout} )`,
      });
    }, 100);
  }, [turnout, isMobileScreen]);

  return (
    <div className={styles['turnout-item']}>
      <h3 className={styles['turnout-item__district']}>{district}</h3>
      <div className={styles['turnout-item__graph']} style={style} />
      <span className={styles['turnout-item__percent']}>
        {Math.floor(turnout * 100)}%
      </span>
    </div>
  );
});

export default TurnoutItem;
