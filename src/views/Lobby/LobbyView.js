import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Rooms from './Rooms';
import ChatBox from './ChatBox';
import { setUsername, setRoomData, setRoom } from '../../redux/actions';

import './LobbyView.css';
class LobbyView extends React.Component {
  // TODO: have isConnecting = true until it receives it's first emit-join-lobby?
  componentDidMount() {
    this.props.ws.on('emit-join-lobby', (data) => {
      this.props.setRoom(data.roomId);
      this.props.setRoomData(data.roomData);
    });
  }

  componentWillUnmount() {
    this.props.ws.off('emit-join-lobby');
  }

  render() {
    if (!this.props.ws || this.props.lobby.roomId !== 'Lobby') {
      return <div>LOADING</div>;
    }
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
    user: state.user,
    ws: state.connection,
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, { setUsername, setRoom, setRoomData })(
  withRouter(LobbyView)
);
