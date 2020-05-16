import React from 'react';

import HostActions from './HostActions';
import './LetterView.css';
const LetterView = ({ letter, isHost }) => {
  //TODO: Use 'isHost' instead of true after finished implementation

  return (
    <div id="letter-view-container">
      {true && <HostActions />}
      <div id="letter">{letter}</div>
    </div>
  );
};

export default LetterView;
