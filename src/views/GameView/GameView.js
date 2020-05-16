import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScoringView from '../EndRound/ScoringView';
import ScatterGameView from './ScatterGameView';
import { getRoomIdFromPathName } from '../../utils/history';
class GameView extends React.Component {
  componentDidMount() {
    //
    if (
      this.props.lobby.roomId !==
      getRoomIdFromPathName(window.location.pathname)
    ) {
      console.log(
        'uh oh',
        this.props.lobby.roomId,
        getRoomIdFromPathName(window.location.pathname)
      );
    }
  }

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
