import React from 'react';
import { FaCheck } from 'react-icons/fa';

const ScoringAnswer = ({ user, text, getsPoint }) => {
  return (
    <div className="scoring-answer-container">
      <div className="user">{user}</div>
      <div className="border"></div>
      <div className="user-answer">{text}</div>
      <div className={`scoring-button${getsPoint ? ' scored' : ''}`}>
        <FaCheck />
      </div>
    </div>
  );
};

export default ScoringAnswer;
