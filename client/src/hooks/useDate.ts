import { useEffect, useState } from 'react';

import useInterval from './useInterval';

export const useDate = () => {
  const [date, setDate] = useState(new Date());
  const [devTime, setDevTime] = useState<
    { hours: number; minutes: number; realTimeInSeconds: number } | null | undefined
  >(undefined);

  const updateDevTime = (curTime?: Date) => {
    const currentTime = curTime || new Date();
    let passedSeconds =
      Math.floor(currentTime.getTime() / 1000) - devTime!.realTimeInSeconds;
    let passedHours = Math.floor(passedSeconds / 3600);
    let passedMinutes = Math.floor((passedSeconds - passedHours * 3600) / 60);
    setDate(
      new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDay(),
        devTime!.hours + passedHours,
        devTime!.minutes + passedMinutes,
      ),
    );
  };

  useInterval(() => {
    const currentTime = new Date();
    if (devTime) {
      if (
        (Math.floor(currentTime.getTime() / 1000) - devTime.realTimeInSeconds) % 60 ===
          0 &&
        Math.floor(currentTime.getTime() / 1000) - devTime.realTimeInSeconds !== 0
      ) {
        updateDevTime(currentTime);
      }
    } else {
      if (currentTime.getSeconds() === 0) setDate(currentTime);
    }
  }, 1000);

  useEffect(() => {
    const time = new Date();
    if (!devTime) setDate(time);
    else updateDevTime(time);
  }, [devTime]);

  const setCustomTime = (hours: number, minutes: number, realTimeInSeconds?: number) => {
    setDevTime({
      hours,
      minutes,
      realTimeInSeconds: realTimeInSeconds || Math.floor(new Date().getTime() / 1000),
    });
  };

  const clearCustomTime = () => {
    setDevTime(null);
  };

  return {
    day: date.getDate(),
    time: {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    },
    setCustomTime,
    clearCustomTime,
  };
};
