import React from 'react';

import PromptInput from './PromptInput';
import PromptText from './PromptText';
import './Prompt.css';
const Prompt = ({ prompt, ind, selInd, onSelect }) => {
  let isSelected = ind === selInd;
  let containerClass = 'prompt-container';
  containerClass += isSelected ? ' selected' : '';
  return (
    <div
      className={containerClass}
      onClick={() => {
        onSelect(ind);
      }}
    >
      <PromptInput isSelected={isSelected} index={ind} placeholder={prompt} />
      <PromptText isSelected={isSelected} index={ind} prompt={prompt} />
    </div>
  );
};

export default Prompt;
