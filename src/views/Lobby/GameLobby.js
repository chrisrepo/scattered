import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChatBox from './ChatBox';
import './Rooms.css';
class GameLobby extends React.Component {
  render() {
    if (!this.props.ws || this.props.lobby.roomId === 'Lobby') {
      return <div>LOADING</div>;
    }
    return (
      <div id="game-lobby-container">
        <ChatBox room={this.props.lobby.roomData[this.props.lobby.roomId]} />
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

export default connect(mapStateToProps, {})(withRouter(GameLobby));
