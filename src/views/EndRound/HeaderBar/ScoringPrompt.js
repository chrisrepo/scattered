import React from 'react';
import { connect } from 'react-redux';

const ScoringPrompt = ({ prompts, promptInd }) => {
  let promptIndDisplay = promptInd + 1;
  let prompt = prompts[promptInd];
  return (
    <div id="scoring-prompt-container">
      <div id="scoring-prompt-header">Prompt #{promptIndDisplay}</div>{' '}
      <div id="scoring-prompt">{prompt}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prompts: state.game.prompts,
    promptInd: state.gameFlow.currentPrompt,
  };
};

export default connect(mapStateToProps, {})(ScoringPrompt);
