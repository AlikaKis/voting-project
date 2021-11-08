import { FC, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router';

import Header from '../../components/Header/Header';
import TimeContext from '../../context/timeContext';
import history from '../../utils/history';
import ProtocolInput from './pages/protocolInput/ProtocolInput';
// import FirstVotersInput from './pages/firstVotersInput/FirstVotersInput';
import TurnoutInput from './pages/turnoutInput/TurnoutInput';
import styles from './styles.module.scss';

const Employee: FC = () => {
  const {
    time: { minutes, hours },
  } = useContext(TimeContext);

  useEffect(() => {
    if (hours < 21 && history.location.pathname !== '/employee-page/turnout') {
      history.push('/employee-page/turnout');
    }
    if (hours >= 21 && history.location.pathname !== '/employee-page/protocol') {
      history.push('/employee-page/protocol');
    }
  }, [minutes, hours]);

  return (
    <div className={styles['employee-page']}>
      <Header />
      <Switch>
        {/* <Route path="/employee-page" exact component={FirstVotersInput} /> */}
        <Route path="/employee-page/turnout" component={TurnoutInput} />
        <Route path="/employee-page/protocol" component={ProtocolInput} />
      </Switch>
    </div>
  );
};

export default Employee;
