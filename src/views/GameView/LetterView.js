import React from 'react';

import './LetterView.css';
const LetterView = ({ letter }) => {
  return (
    <div id="letter-view-container">
      <div id="letter">{letter}</div>
    </div>
  );
};

export default LetterView;
