import classNames from 'classnames';
import { FC } from 'react';

import HeaderLogoSvg from '../../img/header-logo.svg';
import styles from './styles.module.scss';

interface HeaderProps {
  isHideClocks?: boolean;
  className?: string;
}

const Header: FC<HeaderProps> = ({ isHideClocks = false, className }) => {
  return (
    <header className={classNames(styles['header'], className ? className : null)}>
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
