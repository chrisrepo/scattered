import React from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';

const PromptInput = ({ answerText, isSelected, index, prompt }) => {
  const promptProps = useSpring({
    opacity: isSelected ? 0 : 1,
    height: isSelected ? '0%' : '100%',
    display: isSelected ? 'none' : 'flex',
  });
  return (
    <animated.div style={promptProps} className="prompt">
      <span className="prompt-text">
        {index + 1}. {prompt}
      </span>
      {!answerText && <span className="prompt-hint">Click to answer</span>}
      {answerText && <span className="prompt-answer">{answerText}</span>}
    </animated.div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    answerText: state.game.answers[ownProps.index],
  };
};
export default connect(mapStateToProps, {})(PromptInput);
