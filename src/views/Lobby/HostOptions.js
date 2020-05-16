import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './HostOptions.css';
class HostOptions extends React.Component {
  onStartGameClicked = () => {
    this.props.ws.emit('host-start-game', { roomId: this.props.lobby.roomId });
  };

  render() {
    return (
      <div id="game-room-container">
        <h2>Game Options</h2>
        <p>Currently in development</p>
        <div id="start-game-button" onClick={this.onStartGameClicked}>
          Start Game
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    ws: state.connection,
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, {})(withRouter(HostOptions));
