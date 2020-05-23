import React from 'react';
import './UserScore.css';
interface AppProps {
  user: {
    username: string;
    score: number;
  };
}
const UserScore = ({ user }: AppProps) => {
  return (
    <div className="user-score-container">
      <div>{user.username}</div>
      <div>Score: {user.score}</div>
    </div>
  );
};
export default UserScore;
