import { FC, FormEvent, useState } from 'react';

import { useActions } from '../../hooks/useActions';
import styles from './styles.module.css';

const Login: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { fetchLogin } = useActions();
  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    fetchLogin(login, password);
  };
  return (
    <div className={styles['main']}>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
