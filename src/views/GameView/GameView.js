import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoringView from '../EndRound/ScoringView';
import ScatterGameView from './ScatterGameView';
import { GAME_STATUS } from '../../constants/gameFlow';
class GameView extends React.Component {
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
export default connect(mapStateToProps, {})(withRouter(GameView));
