import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoringView from '../EndRound/ScoringView';
import ScatterGameView from './ScatterGameView';
import { GAME_STATUS } from '../../constants/gameFlow';
import {
  setPromptInd,
  setPointForAnswer,
  setScoreboard,
  setAnswers,
  setPrompts,
  setGameStatus,
  setLetter,
} from '../../redux/actions';
import GameContainer from './GameContainer';
class GameView extends React.Component {
  componentDidMount() {
    this.props.ws.on('emit-switch-prompt', (data) => {
      let { promptInd } = data;
      this.props.setPromptInd(promptInd);
    });
    this.props.ws.on('emit-change-answer-score', (data) => {
      let { promptInd, userId, earnedPoint, scoreboard } = data;
      this.props.setScoreboard(scoreboard);
      this.props.setPointForAnswer({ userId, promptInd, earnedPoint });
    });
    this.props.ws.on('emit-end-scoring', (data) => {
      let { letter, prompts, status } = data;
      this.props.setPromptInd(0);
      this.props.setPrompts(prompts);
      this.props.setGameStatus(status);
      this.props.setLetter(letter);
    });
    this.props.ws.on('update-game', (data) => {
      let { scoreboard, answers } = data;
      console.log('update game');
      this.props.setScoreboard(scoreboard);
      this.props.setAnswers(answers);
    });
  }
  render() {
    let isScoring = this.props.status === GAME_STATUS.SCORING;
    if (isScoring) {
      return <ScoringView />;
    }
    return <GameContainer />;
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
    lobby: state.lobby,
    status: state.gameFlow.gameStatus,
  };
};
export default connect(mapStateToProps, {
  setPromptInd,
  setPointForAnswer,
  setPrompts,
  setLetter,
  setGameStatus,
  setScoreboard,
  setAnswers,
})(withRouter(GameView));
