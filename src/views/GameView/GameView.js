import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoringView from '../EndRound/ScoringView';
import ScatterGameView from './ScatterGameView';
import { GAME_STATUS } from '../../constants/gameFlow';
import { setPromptInd, setPointForAnswer } from '../../redux/actions';
class GameView extends React.Component {
  componentDidMount() {
    this.props.ws.on('emit-switch-prompt', (data) => {
      let { promptInd } = data;
      this.props.setPromptInd(promptInd);
    });
    this.props.ws.on('emit-change-answer-score', (data) => {
      let { promptInd, userId, earnedPoint } = data;
      this.props.setPointForAnswer(data);
    });
  }
  render() {
    let isScoring = this.props.status === GAME_STATUS.SCORING;
    if (isScoring) {
      return <ScoringView />;
    }
    return <ScatterGameView />;
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
    lobby: state.lobby,
    status: state.gameFlow.gameStatus,
  };
};
export default connect(mapStateToProps, { setPromptInd, setPointForAnswer })(
  withRouter(GameView)
);
