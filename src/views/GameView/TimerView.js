import React, { useRef, useEffect, useState } from 'react';

import './TimerView.css';

const TimerView = ({ roundStarted, timeLeft }) => {
  let [timerCount, setCount] = useState(timeLeft);
  let interval = useRef(null);
  // Remember the latest callback.
  useEffect(() => {
    interval.current = setInterval(() => {
      if (roundStarted) {
        setCount((timerCount) => timerCount - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [roundStarted]);
  // Clear interval at 0
  if (timerCount <= 0) {
    clearInterval(interval.current);
  }
  return (
    <div id="timer-view-container">
      <div id="timer-header">Time Left:</div>
      <div id="timer">{timerCount}</div>
    </div>
  );
};

export default TimerView;
