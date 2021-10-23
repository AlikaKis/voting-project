import { FC } from 'react';

import VotingService from '../../api/votingService';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './styles.module.css';

const Employee: FC = () => {
  const { access_token } = useTypedSelector((state) => state.auth);
  const { fetchLogout } = useActions();
  const submit = async () => {
    if (access_token) {
      const res = await VotingService.getUserInfo(access_token);
      console.log(res);
    }
  };

  const logout = async () => {
    fetchLogout();
  };

  return (
    <div className={styles['main']}>
      <p>Сотрудника страница</p>
      <button type="button" onClick={submit}>
        Получить юзверя
      </button>
      <button type="button" onClick={logout}>
        Выйти
      </button>
    </div>
  );
};

export default Employee;
