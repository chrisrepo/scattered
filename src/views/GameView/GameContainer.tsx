import React from 'react';
import ScatterGameView from './ScatterGameView';
import ScoreboardView from '../Scoreboard/ScoreboardView';

const containerStyle = {
  display: 'flex',
  height: 'auto',
  width: 'auto',
  flexDirection: 'row',
  padding: '2em',
} as React.CSSProperties;
const GameContainer = () => {
  return (
    <div style={containerStyle}>
      <ScoreboardView />
      <ScatterGameView />
    </div>
  );
};

export default GameContainer;
