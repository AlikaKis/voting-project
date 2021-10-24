import classNames from 'classnames';
import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import ErrorAlert from '../../../../components/ErrorAlert/ErrorAlert';
import FormButton from '../../../../components/FormButton/FormButton';
import FormInput from '../../../../components/FormInput/FormInput';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import ManImg from '../../../../img/desk-man.png';
import PeopleImg from '../../../../img/desk-people.png';
import history from '../../../../utils/history';
import styles from './styles.module.scss';

const FirstVotersInput: FC = () => {
  const validationSchema = yup.object().shape({
    votersCount: yup
      .number()
      .typeError('Должно быть числом')
      .min(0, 'Не может быть меньше 0')
      .required('Обязательное поле'),
  });
  return (
    <div className={styles['first-voters']}>
      <div className={styles['first-voters__picture']}>
        <div className={styles['desk']}>
          <p className={styles['desk__text']}>Добро пожаловать!</p>
          <p className={styles['desk__text']}>
            Вы вошли как представитель <br /> участка{' '}
            <span className={styles['desk__area-number']}>4221</span>{' '}
          </p>
          <img src={PeopleImg} alt="" className={styles['desk__two-people']} />
          <img src={ManImg} alt="" className={styles['desk__one-man']} />
        </div>
      </div>
      <div className={styles['first-voters__content-container']}>
        <div className={styles['content']}>
          <Formik
            initialValues={{ votersCount: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(`На сервер отправились данные : ${JSON.stringify(values)}`);
                history.push('/employee-page/all-voters');
              }, 1000);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <form onSubmit={handleSubmit} className={styles['first-voters-form']}>
                <ErrorAlert
                  header="Ошибка отправки"
                  description="Проверьте данные и попробуйте ещё раз"
                  className={classNames(styles['first-voters-form__main-error'])}
                />
                <p className={styles['first-voters-form__description']}>
                  Введите <span className={'bold-text'}>количество </span> избирателей,
                  явившихся на участок к <span className={'bold-text'}>12:00</span>
                </p>

                <FormInput
                  labelName="Явка"
                  id="votersCount"
                  name="votersCount"
                  type="number"
                  value={values.votersCount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.votersCount || ''}
                  required={true}
                  showError={!!(touched.votersCount && errors.votersCount)}
                  hideLabel
                  useErrorDisplay
                />
                <p className={styles['first-voters-form__time-left']}>
                  до конца ввода явки <span className={styles['time-count']}>18</span>{' '}
                  минут{' '}
                </p>
                <FormButton type="submit" disabled={!isValid && isSubmitting}>
                  {isSubmitting ? <LoadingSpinner /> : 'Отправить'}
                </FormButton>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FirstVotersInput;
