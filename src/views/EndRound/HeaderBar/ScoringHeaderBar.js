import React from 'react';

import ScoringButton from './ScoringButton';
import ScoringLetter from './ScoringLetter';
import ScoringPrompt from './ScoringPrompt';
import './ScoringHeaderBar.css';
const ScoringHeaderBar = () => {
  return (
    <div id="scoring-header-bar">
      <div id="scoring-header-left">
        <ScoringLetter />
      </div>
      <div id="scoring-header-right">
        <ScoringButton text={'<'} />
        <ScoringPrompt />
        <ScoringButton text={'>'} />
      </div>
    </div>
  );
};

export default ScoringHeaderBar;
