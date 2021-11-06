import { FC, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router';

import Header from '../../components/Header/Header';
import TimeContext from '../../context/timeContext';
import history from '../../utils/history';
import CandidatesList from './pages/candidatesList/CandidatesList';
import Results from './pages/results/Results';
import Turnout from './pages/turnout/Turnout';
import styles from './styles.module.scss';

const Main: FC = () => {
  const {
    time: { minutes, hours },
  } = useContext(TimeContext);

  useEffect(() => {
    if (hours < 18 && history.location.pathname !== '/main/candidates-list') {
      history.push('/main/candidates-list');
    }
    if (
      (hours === 18 && minutes === 0) ||
      (hours >= 18 && hours < 21 && history.location.pathname !== '/main/turnout')
    ) {
      history.push('/main/turnout');
    }
    if (
      (hours === 21 && minutes === 0) ||
      (hours >= 21 && history.location.pathname !== '/main/results')
    ) {
      history.push('/main/results');
    }
  }, [minutes, hours]);

  return (
    <div className={styles['main']}>
      <Header className={styles['main__header']} />
      <Switch>
        <Route path="/main/candidates-list" component={CandidatesList} />
        <Route path="/main/turnout" component={Turnout} />
        <Route path="/main/results" component={Results} />
      </Switch>
    </div>
  );
};

export default Main;
