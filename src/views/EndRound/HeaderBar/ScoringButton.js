import React from 'react';

import './ScoringButton.css';
const ScoringButton = ({ text, clickHandler }) => {
  return (
    <div onClick={clickHandler} className="scoring-button-container">
      <div className="scoring-button">{text}</div>
    </div>
  );
};

export default ScoringButton;
