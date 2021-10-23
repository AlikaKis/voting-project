import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

interface FormButtonProps {
  type: 'button' | 'submit';
  className?: string;
  disabled: boolean;
  children: ReactNode;
}

const FormButton: FC<FormButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      className={classNames(styles['form-button'], props.className)}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default FormButton;
