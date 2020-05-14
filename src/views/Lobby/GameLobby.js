import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChatBox from './ChatBox';
import HostOptions from './HostOptions';
import { isHost } from '../../utils/scattergories';
import './GameLobby.css';
class GameLobby extends React.Component {
  render() {
    if (!this.props.ws || this.props.lobby.roomId === 'Lobby') {
      return <div>LOADING</div>;
    }
    return (
      <div id="game-lobby-container">
        {isHost(this.props.lobby, this.props.ws) && <HostOptions />}
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
