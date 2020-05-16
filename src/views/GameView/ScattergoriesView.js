import React from 'react';

import Prompt from './Prompt/Prompt';
import './ScattergoriesView.css';
const ScattergoriesView = ({
  prompts,
  selInd,
  onSelect,
  onKeyPress,
  status,
}) => {
  return (
    <div id="scattergories-view-container" onKeyDown={(e) => onKeyPress(e)}>
      <div id="prompt-list">
        {prompts.map((prompt, index) => {
          return (
            <Prompt
              key={index}
              status={status}
              prompt={prompt}
              ind={index}
              selInd={selInd}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScattergoriesView;
