import classNames from 'classnames';
import { FC, useState } from 'react';

import styles from './styles.module.scss';

interface FormInputProps {
  type: string;
  value: any;
  onChange: any;
  onBlur: any;
  className?: string;
  showError: boolean;
  errorMessage: string;
  labelName: string;
  name: string;
  id: string;
  required: boolean;
  hasIcon?: boolean;
  iconUrl?: string;
  placeholder?: string;
}

const FormInput: FC<FormInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={classNames(
        styles['form-input'],
        props.className ? props.className : null,
      )}>
      <label htmlFor={props.id} className={styles['form-input__label']}>
        {props.labelName}
      </label>
      <div className={styles['form-input__input-wrapper']}>
        <input
          type={showPassword ? 'text' : props.type}
          placeholder={props.placeholder || ''}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={classNames(
            styles['form-input__input'],
            props.showError ? styles['form-input__input_error'] : null,
            props.hasIcon ? styles['form-input__input_with-icon'] : null,
          )}
          id={props.id}
          name={props.name}
          required={props.required}
        />
        {props.hasIcon && props.iconUrl ? (
          <img
            src={props.iconUrl}
            alt=""
            className={styles['form-input__input-icon']}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        ) : null}
      </div>

      <small
        className={classNames(
          styles['form-input__error'],
          props.showError ? styles['form-input__error_showing'] : null,
        )}>
        {props.errorMessage}
      </small>
    </div>
  );
};

export default FormInput;
