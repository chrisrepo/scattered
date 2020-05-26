import React from 'react';
import './UserScore.css';
interface AppProps {
  user: {
    emoji: string;
    username: string;
    score: number;
  };
}
const UserScore = ({ user }: AppProps) => {
  return (
    <div className="scoreboard-row">
      <div className="left">
        {user.emoji}
        {user.username}
      </div>
      <div className="right">Score: {user.score}</div>
    </div>
  );
};
export default UserScore;
