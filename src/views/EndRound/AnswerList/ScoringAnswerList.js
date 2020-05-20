import React from 'react';
import { connect } from 'react-redux';

import LoadingSpinner from '../../../LoadingSpinner';
import ScoringAnswer from './ScoringAnswer';
import './ScoringAnswerList.css';
const ScoringAnswerList = ({ gameFlow }) => {
  let { answers, currentPrompt, round } = gameFlow;
  // TODO: may need to -1 to round later on depending on flow
  let roundAnswers = answers[round];
  if (!roundAnswers) {
    return <LoadingSpinner loading size={100} />;
  }
  let roundKeys = Object.keys(roundAnswers);
  return (
    <div id="scoring-answer-list">
      {roundAnswers &&
        roundKeys.map((userKey) => {
          let userAnswerList = roundAnswers[userKey];
          let answer = userAnswerList[currentPrompt];
          return (
            <ScoringAnswer
              key={userKey}
              text={answer.text}
              getsPoint={answer.earnedPoint}
              user={answer.username}
            />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prompts: state.game.prompts,
    gameFlow: state.gameFlow,
  };
};

export default connect(mapStateToProps, {})(ScoringAnswerList);
