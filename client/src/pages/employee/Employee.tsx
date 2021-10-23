import { FC } from 'react';
import { Route, Switch } from 'react-router';

import Header from '../../components/Header/Header';
import FirstVotersInput from './pages/firstVotersInput/FirstVotersInput';
import OtherVotersInput from './pages/otherVotersInput/OtherVotersInput';
import ProtocolInput from './pages/protocolInput/ProtocolInput';
import styles from './styles.module.scss';

const Employee: FC = () => {
  return (
    <div className={styles['employee-page']}>
      <Header />
      <Switch>
        <Route path="/employee-page" exact component={FirstVotersInput} />
        <Route path="/employee-page/all-voters" exact component={OtherVotersInput} />
        <Route path="/employee-page/protocol" exact component={ProtocolInput} />
      </Switch>
    </div>
  );
};

export default Employee;
