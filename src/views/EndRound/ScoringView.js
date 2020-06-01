import React from 'react';

import ScoringAnswerList from './AnswerList/ScoringAnswerList';
import ScoringHeaderBar from './HeaderBar/ScoringHeaderBar';
import ScoreboardView from '../Scoreboard/ScoreboardView';

import './ScoringView.css';

const ScoringView = () => {
  return (
    <div id="scoring-view-container">
      <ScoreboardView />
      <div id="score-container">
        <ScoringHeaderBar />
        <ScoringAnswerList />
      </div>
    </div>
  );
};

export default ScoringView;
