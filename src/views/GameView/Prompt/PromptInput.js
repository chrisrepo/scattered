import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';

import { setAnswer } from '../../../redux/actions';

const PromptInput = ({ placeholder, isSelected, index, setAnswer }) => {
  const promptInput = useRef(null);
  const firedFocus = useRef(false); // Only want to focus one time so we track if we have

  // Focuses input after render complete
  // Necessary because animation re-renders component as it animates, so the focus is overwritten
  const fireOnRest = (isSelected) => {
    if (isSelected && promptInput.current && !firedFocus.current) {
      promptInput.current.focus();
      firedFocus.current = true;
    }
  };
  useEffect(() => {
    if (isSelected) {
      promptInput.current.focus();
    }
  }, [isSelected]);
  const inputProps = useSpring({
    height: isSelected ? '50px' : '0px',
    opacity: isSelected ? 1 : 0,
    onRest: fireOnRest, // focus input
  });

  return (
    <animated.input
      ref={(input) => (promptInput.current = input)}
      style={inputProps}
      onChange={(e) => {
        if (isSelected) {
          setAnswer(e.target.value, index);
        }
      }}
      placeholder={`${index + 1}. ${placeholder}`}
    />
  );
};

export default connect(null, { setAnswer })(PromptInput);
