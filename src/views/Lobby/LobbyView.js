import React from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import ChatBox from './ChatBox';

import './LobbyView.css';
class LobbyView extends React.Component {
  render() {
    return (
      <div id="lobby-view">
        <Rooms
          roomId={this.props.lobby.roomId}
          rooms={this.props.lobby.roomData}
        />
        <ChatBox room={this.props.lobby.roomData[this.props.lobby.roomId]} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, {})(LobbyView);
