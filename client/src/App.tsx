import './App.css';

import { FC, useEffect } from 'react';

import AppRouter from './components/AppRouter';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { RouteNames } from './routes';
import history from './utils/history';

const App: FC = () => {
  const { fetchRefreshTokens } = useActions();
  const { access_token, isFirstRefreshDone } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    fetchRefreshTokens();
  }, []);

  useEffect(() => {
    if (isFirstRefreshDone) {
      if (history.location.pathname === RouteNames.LOGIN_PAGE) {
        if (access_token) history.push(RouteNames.EMPLOYEE_PAGE);
      }
      if (history.location.pathname.includes(RouteNames.EMPLOYEE_PAGE)) {
        if (!access_token) history.push(RouteNames.LOGIN_PAGE);
      }
    }
  }, [access_token, history.location.pathname, isFirstRefreshDone]);
  return (
    <div className="wrapper">
      {!isFirstRefreshDone ? <span>Загрузка</span> : <AppRouter />}
    </div>
  );
};

export default App;
