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
    // Reroute if username empty
    let username = sessionStorage.getItem('sc-user');
    if (!this.props.user.username && username) {
      this.props.setUsername(username);
    }
    if (!username && !this.props.user.username) {
      this.props.history.push('/');
    }
    username = username ? username : this.props.username;

    this.props.ws.on('emit-join-lobby', (data) => {
      console.log(data.roomId, data.roomData);
      this.props.setRoom(data.roomId);
      this.props.setRoomData(data.roomData);
    });
    const body = {
      username,
    };
    this.props.ws.emit('join-lobby', body);
  }
  render() {
    return (
      <div id="lobby-view">
        <Rooms
          roomId={this.props.lobby.roomId}
          rooms={this.props.lobby.roomData}
        />
        <ChatBox />
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
