import classNames from 'classnames';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';

import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import EyeSvg from '../../img/eye-label.svg';
import LogoSvg from '../../img/login-page-logo.svg';
import styles from './styles.module.scss';

const Login: FC = () => {
  const { fetchLogin } = useActions();
  const { errorLogin, isTryingToLogin } = useTypedSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .typeError('Должно быть строкой')
      .trim()
      .required('Обязательное поле'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
  });
  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__picture']}>
        <img src={LogoSvg} alt="Лого выборов мэра Москвы 2" />
      </div>
      <div className={styles['login-page__content']}>
        <Header isHideClocks={true} />
        <div className={styles['content-container']}>
          <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              fetchLogin(values.login, values.password);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <form onSubmit={handleSubmit} className={styles['login-form']}>
                <p className={styles['login-form__description']}>
                  Введите логин и пароль
                </p>
                <small
                  className={classNames(
                    styles['login-form__main-error'],
                    errorLogin ? styles['login-form__main-error_showing'] : null,
                  )}>
                  Неверные данные. Попробуйте ещё раз
                </small>
                <label htmlFor="login" className={styles['login-form__label']}>
                  Логин
                </label>
                <input
                  type="text"
                  placeholder="Логин"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames(
                    styles['login-form__input'],
                    touched.login && errors.login
                      ? styles['login-form__input_error']
                      : null,
                  )}
                  id="login"
                  name="login"
                  required
                />

                <small
                  className={classNames(
                    styles['login-form__error'],
                    touched.login && errors.login
                      ? styles['login-form__error_showing']
                      : null,
                  )}>
                  {errors.login || ''}
                </small>

                <label htmlFor="password" className={styles['login-form__label']}>
                  Пароль
                </label>
                <div className={styles['login-form__input-wrapper']}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Пароль"
                    className={classNames(
                      styles['login-form__input'],
                      styles['login-form__input_with-icon'],
                      touched.password && errors.password
                        ? styles['login-form__input_error']
                        : null,
                    )}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password"
                    required
                  />
                  <img
                    src={EyeSvg}
                    alt="show password"
                    className={styles['login-form__input-icon']}
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  />
                </div>
                <small
                  className={classNames(
                    styles['login-form__error'],
                    touched.password && errors.password
                      ? styles['login-form__error_showing']
                      : null,
                  )}>
                  {errors.password || ''}
                </small>

                <button
                  type="submit"
                  className={styles['login-form__button']}
                  disabled={isTryingToLogin && !isValid}>
                  {isTryingToLogin ? <LoadingSpinner /> : 'Войти'}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
