import React from 'react';

const ScoringButton = ({ text }) => {
  return (
    <div className="scoring-button-container">
      <div className="scoring-button">{text}</div>
    </div>
  );
};

export default ScoringButton;
