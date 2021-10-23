import classNames from 'classnames';
import { FC } from 'react';

import HeaderLogoSvg from '../../img/header-logo.svg';
import styles from './styles.module.scss';

interface HeaderProps {
  isHideClocks?: boolean;
}

const Header: FC<HeaderProps> = ({ isHideClocks = false }) => {
  return (
    <header className={styles['header']}>
      <p
        className={classNames(
          styles['header__clock'],
          isHideClocks ? styles['header__clock_hidden'] : null,
        )}>
        10:40
      </p>
      <img
        src={HeaderLogoSvg}
        alt="Выборы мэра Москвы лого"
        className={styles['header__logo']}
      />
    </header>
  );
};

export default Header;
