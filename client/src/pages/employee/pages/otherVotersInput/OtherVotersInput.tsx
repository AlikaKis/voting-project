import classNames from 'classnames';
import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import ErrorAlert from '../../../../components/ErrorAlert/ErrorAlert';
import FormButton from '../../../../components/FormButton/FormButton';
import FormInput from '../../../../components/FormInput/FormInput';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import history from '../../../../utils/history';
import styles from './styles.module.scss';

const OtherVotersInput: FC = () => {
  const validationSchema = yup.object().shape({
    votersCount: yup
      .number()
      .typeError('Должно быть числом')
      .min(0, 'Не может быть меньше 0')
      .required('Обязательное поле'),
  });
  return (
    <div className={styles['voters']}>
      <div className={styles['voters__results']}>
        <table className={styles['resluts-table']}>
          <caption className={styles['resluts-table__header']}>Участок №4221</caption>
          <thead>
            <tr>
              <th>Время</th>
              <th>Явка, чел.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12:00</td>
              <td>234</td>
            </tr>
            <tr>
              <td>15:00</td>
              <td>132</td>
            </tr>
            <tr>
              <td>18:00</td>
              <td>34</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles['voters__content-container']}>
        <div className={styles['content']}>
          <Formik
            initialValues={{ votersCount: 0 }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(`На сервер отправились данные : ${JSON.stringify(values)}`);
                history.push('/employee-page/protocol');
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
              <form onSubmit={handleSubmit} className={styles['voters-form']}>
                <ErrorAlert
                  header="Ошибка отправки"
                  description="Проверьте данные и попробуйте ещё раз"
                  className={classNames(styles['voters-form__main-error'])}
                />
                <p className={styles['voters-form__description']}>
                  Введите <span className={'bold-text'}>количество </span> избирателей,
                  явившихся на участок к <span className={'bold-text'}>20:00</span>
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
                <p className={styles['voters-form__time-left']}>
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

export default OtherVotersInput;
