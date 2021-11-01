import { useEffect, useState } from 'react';

export const useDate = () => {
  const [time, setTime] = useState(0);
  const [today, setDate] = useState(new Date());
  const [devTime, setDevTime] = useState<
    { hours: number; minutes: number; seconds: number } | null | undefined
  >(undefined);
  useEffect(() => {
    const date = new Date();
    if (devTime) {
      if (devTime.seconds === 0) {
        setDate(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDay(),
            devTime.hours,
            devTime.minutes,
            devTime.seconds,
          ),
        );
      }
      setDevTime((prev) => {
        if (prev) {
          let newSeconds = prev.hours * 60 * 60 + prev.minutes * 60 + prev.seconds + 1;
          return {
            hours: Math.floor(newSeconds / 3600),
            minutes: Math.floor((newSeconds - Math.floor(newSeconds / 3600) * 3600) / 60),
            seconds: newSeconds % 60,
          };
        } else return null;
      });
    } else {
      if (date.getSeconds() === 0) setDate(date);
    }
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  useEffect(() => {
    if (devTime === null) setDate(new Date());
  }, [devTime]);

  const setCustomTime = (hours: number, minutes: number) => {
    setDevTime({
      hours,
      minutes,
      seconds: 0,
    });
  };

  const clearCustomTime = () => {
    setDevTime(null);
  };

  return {
    day: today.getDate(),
    time: {
      hours: today.getHours(),
      minutes: today.getMinutes(),
    },
    setCustomTime,
    clearCustomTime,
  };
};
