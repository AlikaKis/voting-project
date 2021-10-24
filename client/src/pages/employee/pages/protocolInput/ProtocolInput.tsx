import classNames from 'classnames';
import { Field, FieldArray, Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import ErrorAlert from '../../../../components/ErrorAlert/ErrorAlert';
import FormButton from '../../../../components/FormButton/FormButton';
import FormInput from '../../../../components/FormInput/FormInput';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import history from '../../../../utils/history';
import styles from './styles.module.scss';

const ProtocolInput: FC = () => {
  const candidates = [
    { id: 1, full_name: 'Поздняков Н. И.' },
    { id: 2, full_name: 'Иванов И. И.' },
    { id: 3, full_name: 'Смирнов Д. А.' },
    { id: 4, full_name: 'Журавлева И. Г.' },
    { id: 5, full_name: 'Егоров И. П.' },
  ];
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
    candidatesVotesList: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().min(0).required('Id обязателен'),
          full_name: yup.string().required('ФИО обязательно'),
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
    <div className={styles['protocol']}>
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
            alert(`На сервер отправились данные : ${JSON.stringify(values, null, 2)}`);
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
                    <>
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
                            {item.full_name}
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
                    </>
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
    </div>
  );
};

export default ProtocolInput;
