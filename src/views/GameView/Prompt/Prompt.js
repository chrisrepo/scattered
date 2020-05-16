import React from 'react';
import { useSpring, animated } from 'react-spring';

import PromptInput from './PromptInput';
import PromptText from './PromptText';
import { GAME_STATUS } from '../../../constants/gameFlow';

import './Prompt.css';
const Prompt = ({ prompt, ind, selInd, onSelect, status }) => {
  let isSelected = ind === selInd;
  let show = status !== GAME_STATUS.PRE_ROUND;
  const containerProps = useSpring({
    backgroundColor: show ? 'unset' : '#222',
    height: show ? '0%' : '100%',
  });
  let containerClass = 'prompt-container';
  containerClass += isSelected ? ' selected' : '';
  return (
    <div
      className={containerClass}
      onClick={() => {
        onSelect(ind);
      }}
    >
      <animated.div
        style={containerProps}
        className="prompt-hider"
      ></animated.div>
      <PromptInput isSelected={isSelected} index={ind} placeholder={prompt} />
      <PromptText
        status={status}
        isSelected={isSelected}
        index={ind}
        prompt={prompt}
      />
    </div>
  );
};

export default Prompt;
