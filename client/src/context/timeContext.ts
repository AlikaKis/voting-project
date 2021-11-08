import { createContext } from 'react';

interface ITimeContext {
  time: { hours: number; minutes: number };
  day: number;
  clearCustomTime: () => void;
  setCustomTime: (hours: number, minutes: number, realTimeInSeconds?: number) => void;
}

const TimeContext = createContext({} as ITimeContext);

TimeContext.displayName = 'timeContext';

export default TimeContext;
