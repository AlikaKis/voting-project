import classNames from 'classnames';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';

import VotingService from '../../../../api/votingService';
import ErrorAlert from '../../../../components/ErrorAlert/ErrorAlert';
import FormButton from '../../../../components/FormButton/FormButton';
import FormInput from '../../../../components/FormInput/FormInput';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import history from '../../../../utils/history';
import styles from './styles.module.scss';

const TurnoutInput: FC = () => {
  const { access_token } = useTypedSelector((state) => state.auth);
  const [info, setInfo] = useState<{
    votingAreaId: number;
    turnoutData: {
      time: string;
      count_voters: number;
    }[];
  }>({
    votingAreaId: 0,
    turnoutData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchInfo = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setTimeout(async () => {
        const result = (await VotingService.getTurnoutInfo(access_token!)).data;
        setInfo({
          votingAreaId: result.voting_area_id,
          turnoutData: result.va_data,
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const validationSchema = yup.object().shape({
    votersCount: yup
      .number()
      .typeError('Должно быть числом')
      .min(0, 'Не может быть меньше 0')
      .required('Обязательное поле'),
  });
  return (
    <div
      className={classNames(
        styles['voters'],
        isError || isLoading ? styles['voters_empty'] : null,
      )}>
      {isLoading ? (
        <LoadingSpinner className={styles['voters__loader']} isPrimaryColor />
      ) : isError ? (
        <div className={styles['voters__error']}>
          <span className={styles['error-text']}>
            Произошла ошибка. Проверьте соединение с интернетом
          </span>
          <FormButton
            type="button"
            disabled={false}
            className={styles['error-btn']}
            onClick={fetchInfo}>
            Перезагрузить данные
          </FormButton>
        </div>
      ) : (
        <>
          <div className={styles['voters__results']}>
            <table className={styles['resluts-table']}>
              <caption className={styles['resluts-table__header']}>
                Участок №{info.votingAreaId}
              </caption>
              <thead>
                <tr>
                  <th>Время</th>
                  <th>Явка, чел.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12:00</td>
                  <td>{info.turnoutData[0]?.count_voters || 'Ожидается ввод'}</td>
                </tr>
                <tr>
                  <td>15:00</td>
                  <td>{info.turnoutData[1]?.count_voters || 'Ожидается ввод'}</td>
                </tr>
                <tr>
                  <td>18:00</td>
                  <td>{info.turnoutData[2]?.count_voters || 'Ожидается ввод'}</td>
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
                      Введите <span className={'bold-text'}>количество </span>{' '}
                      избирателей, явившихся на участок к{' '}
                      <span className={'bold-text'}>20:00</span>
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
        </>
      )}
    </div>
  );
};

export default TurnoutInput;
