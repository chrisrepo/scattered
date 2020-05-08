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
        <div id="scoring-header-top">
          <ScoringPrompt />
        </div>
        <div id="scoring-header-bottom">
          <ScoringButton text={'<'} />
          <ScoringButton text={'>'} />
        </div>
      </div>
    </div>
  );
};

export default ScoringHeaderBar;
