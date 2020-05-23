import React from 'react';

import './LetterView.css';
const LetterView = ({ letter, roundStarted, isHost }) => {
  //TODO: Use 'isHost' instead of true after finished implementation

  return (
    <div id="letter-view-container">
      <div id="letter">{letter}</div>
    </div>
  );
};

export default LetterView;
