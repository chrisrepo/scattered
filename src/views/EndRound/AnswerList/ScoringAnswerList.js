import React from 'react';

import ScoringAnswer from './ScoringAnswer';
import './ScoringAnswerList.css';
const ScoringAnswerList = () => {
  return (
    <div id="scoring-answer-list">
      <ScoringAnswer text="test text 1" getsPoint user="jabba the mutt" />
      <ScoringAnswer text="two text 2" user="boba foot" />
      <ScoringAnswer text="asdfsad" user="lando calzone" />
      <ScoringAnswer text="fesadfsda" getsPoint user="darth fader" />
    </div>
  );
};

export default ScoringAnswerList;
