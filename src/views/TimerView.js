import React from 'react';

import './TimerView.css';

const TimerView = ({ timeLeft }) => {
  return (
    <div id="timer-view-container">
      <div id="timer-header">Time Left:</div>
      <div id="timer">{timeLeft}</div>
    </div>
  );
};

export default TimerView;
