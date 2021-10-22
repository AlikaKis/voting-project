import { FC, useEffect } from 'react';

import styles from './App.module.css';
import AppRouter from './components/AppRouter';
import { useActions } from './hooks/useActions';

const App: FC = () => {
  const { fetchRefreshTokens } = useActions();
  useEffect(() => {
    fetchRefreshTokens();
  }, []);
  return (
    <div className={styles['App']}>
      <AppRouter />
    </div>
  );
};

export default App;
