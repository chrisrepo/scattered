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
      {index + 1}. {prompt}
      {!answerText && <span className="promptHint">Click to answer</span>}
      {answerText && <span className="promptAnswer">{answerText}</span>}
    </animated.div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    answerText: state.game.answers[ownProps.index],
  };
};
export default connect(mapStateToProps, {})(PromptInput);
