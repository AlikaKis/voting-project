import classNames from 'classnames';
import { Field, FieldArray, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';

import VotingService from '../../../../api/votingService';
import ErrorAlert from '../../../../components/ErrorAlert/ErrorAlert';
import FormButton from '../../../../components/FormButton/FormButton';
import FormInput from '../../../../components/FormInput/FormInput';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
// import history from '../../../../utils/history';
import styles from './styles.module.scss';

const ProtocolInput: FC = () => {
  const { access_token } = useTypedSelector((state) => state.auth);
  const [candidates, setCandidates] = useState<
    {
      candidate_id: number;
      candidate: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setTimeout(async () => {
        const result = (await VotingService.getCandidatesInfo(access_token!)).data;
        setCandidates(result.candidates);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const validationSchema = yup.object().shape({
    bulletinsCount: yup
      .number()
      .typeError('Должно быть числом')
      .min(0, 'Не может быть меньше 0')
      .required('Обязательное поле'),
    spoiledBulletinsCount: yup
      .number()
      .typeError('Должно быть числом')
      .min(0, 'Не может быть меньше 0')
      .required('Обязательное поле'),
    candidateVotes: yup
      .array()
      .of(
        yup.object().shape({
          value: yup
            .number()
            .typeError('Должно быть числом')
            .min(0, 'Не может быть меньше 0')
            .required('Обязательное поле'),
        }),
      )
      .required('Необходимо заполнить голоса'),
  });
  return (
    <div
      className={classNames(
        styles['protocol'],
        isError || isLoading ? styles['protocol_empty'] : null,
      )}>
      {isLoading ? (
        <LoadingSpinner className={styles['protocol__loader']} isPrimaryColor />
      ) : isError ? (
        <div className={styles['protocol__error']}>
          <span className={styles['error-text']}>
            Произошла ошибка. Проверьте соединение с интернетом
          </span>
          <FormButton
            type="button"
            disabled={false}
            className={styles['error-btn']}
            onClick={fetchCandidates}>
            Перезагрузить данные
          </FormButton>
        </div>
      ) : (
        <Formik
          initialValues={{
            bulletinsCount: 0,
            spoiledBulletinsCount: 0,
            candidateVotes: [...candidates.map((item) => ({ ...item, value: 0 }))],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              const results = {
                bulletinsCount: values.bulletinsCount,
                spoiledBulletinsCount: values.spoiledBulletinsCount,
                candidateVotes: values.candidateVotes.map((item) => ({
                  id: item.candidate_id,
                  value: item.value,
                })),
              };
              alert(`На сервер отправились данные : ${JSON.stringify(results, null, 2)}`);
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
            <form
              onSubmit={handleSubmit}
              className={classNames(styles['protocol__form'], styles['protocol-form'])}>
              <div className={classNames(styles['protocol-form__wrapper'])}>
                <div
                  className={classNames(
                    styles['protocol-form__bulletins'],
                    styles['bulletins'],
                  )}>
                  <p className={styles['protocol-form__description']}>
                    Введите количество <br />{' '}
                    <span className={'bold-text'}>обработанных </span> бюллетеней
                  </p>
                  <FormInput
                    labelName="Явка"
                    id="bulletinsCount"
                    name="bulletinsCount"
                    type="number"
                    value={values.bulletinsCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.bulletinsCount || ''}
                    required
                    showError={!!(touched.bulletinsCount && errors.bulletinsCount)}
                    hideLabel
                    className={styles['bulletins__input']}
                    classNameForInput={styles['bulletins__input-block']}
                  />
                  <p className={styles['protocol-form__description']}>
                    Введите количество <br />{' '}
                    <span className={'bold-text'}>испорченных </span> бюллетеней
                  </p>
                  <FormInput
                    labelName="Явка"
                    id="spoiledBulletinsCount"
                    name="spoiledBulletinsCount"
                    type="number"
                    value={values.spoiledBulletinsCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.spoiledBulletinsCount || ''}
                    required={true}
                    showError={
                      !!(touched.spoiledBulletinsCount && errors.spoiledBulletinsCount)
                    }
                    hideLabel
                    className={styles['bulletins__input']}
                    classNameForInput={styles['bulletins__input-block']}
                  />
                </div>
                <div
                  className={classNames(styles['protocol-form__votes'], styles['votes'])}>
                  <p className={styles['protocol-form__description']}>
                    Введите <span className={'bold-text'}>количество</span> голосов по
                    кандидатам
                  </p>
                  <FieldArray
                    name="candidateVotes"
                    render={() => (
                      <div className={styles['votes__candidate-list']}>
                        {values.candidateVotes.map((item, index) => (
                          <div
                            key={index}
                            className={classNames(
                              styles['votes__input-block'],
                              errors.candidateVotes && errors.candidateVotes[index]
                                ? styles['votes__input-block_error']
                                : null,
                            )}>
                            <label
                              htmlFor={`candidateVotes[${index}]`}
                              className={styles['votes__label']}>
                              {item.candidate.split(' ')[0] +
                                ' ' +
                                item.candidate.split(' ')[1][0] +
                                '. ' +
                                item.candidate.split(' ')[2][0] +
                                '.'}
                            </label>
                            <Field
                              type="number"
                              name={`candidateVotes[${index}].value`}
                              id={`candidateVotes[${index}]`}
                              required
                              className={styles['votes__input']}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <ErrorAlert
                header="Ошибка отправки"
                description="Проверьте данные и попробуйте ещё раз"
                className={classNames(
                  styles['protocol-form__main-error'],
                  styles['protocol-form__main-error_hidden'],
                )}
              />
              <p
                className={classNames(
                  styles['protocol-form__time-left'],
                  styles['protocol-form__time-left_hidden'],
                )}>
                до конца ввода данных протокола <span className={'bold-text'}>18</span>{' '}
                минут{' '}
              </p>
              <FormButton
                type="submit"
                disabled={!isValid && isSubmitting}
                className={styles['protocol-form__submit-btn']}>
                {isSubmitting ? <LoadingSpinner /> : 'Отправить'}
              </FormButton>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProtocolInput;
