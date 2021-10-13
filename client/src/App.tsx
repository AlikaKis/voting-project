import { FC } from 'react';

import styles from './App.module.css';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  return (
    <div className={styles['App']}>
      <AppRouter />
    </div>
  );
};

export default App;
