import React from 'react';

import ScoringAnswerList from './ScoringAnswerList';
import ScoringHeaderBar from './HeaderBar/ScoringHeaderBar';
import './ScoringView.css';

const ScoringView = () => {
  return (
    <div id="scoring-view-container">
      <ScoringHeaderBar />
      <ScoringAnswerList />
    </div>
  );
};

export default ScoringView;
