import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoringView from '../EndRound/ScoringView';
import ScatterGameView from './ScatterGameView';
class GameView extends React.Component {
  render() {
    let roundEnded = false; //TODO: handle this
    if (roundEnded) {
      return <ScoringView />;
    }
    return <ScatterGameView />;
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
    lobby: state.lobby,
  };
};
export default connect(mapStateToProps, {})(withRouter(GameView));
