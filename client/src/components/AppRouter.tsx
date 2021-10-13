import { FC } from 'react';
import { Route, Switch } from 'react-router';

import NotFound from '../pages/notFound/NotFound';
import { routes } from '../routes';

const AppRouter: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
