import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import {
  setWebsocketConnection,
  setRoomData,
  setRoom,
  setUsername,
} from './redux/actions';
import { getRoomIdFromPathName } from './utils/history';
class IOWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: true,
    };
    console.log('constructing');
    const ws = io();
    ws.on('connect', () => {
      this.onWebsocketConnect(ws);
      const pathname = window.location.pathname;
      // Reconnection/Connection logic
      if (pathname.indexOf('lobby') !== -1) {
        console.log('handle lobby connection');
        this.handleLobbyConnection();
        const newRoom = getRoomIdFromPathName(pathname);
        if (newRoom !== 'Lobby') {
          this.props.ws.emit('switch-room', {
            roomId: newRoom,
            oldId: 'Lobby',
          });
          this.props.setRoom(newRoom);
        }
      }
    });

    ws.on('update-room', (data) => {
      console.log('update -room', data.roomData);
      this.props.setRoomData(data.roomData);
    });
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  handleLobbyConnection = () => {
    // Reroute if username empty
    let username = sessionStorage.getItem('sc-user');
    if (!this.props.user.username && username) {
      this.props.setUsername(username);
    }
    if (!username && !this.props.user.username) {
      this.props.history.push('/');
    }
    username = username ? username : this.props.username;
    const body = {
      username,
    };
    console.log('emit join lobby IOWrap', body);
    this.props.ws.emit('join-lobby', body);
  };

  onBackButtonEvent = (event) => {
    //Detected a back button event
    let movingTo = getRoomIdFromPathName(window.location.pathname);
    console.log('Moving to: ', movingTo, ' from: ', this.props.curRoomId);
    if (movingTo) {
      this.props.ws.emit('switch-room', {
        roomId: movingTo,
        oldId: this.props.curRoomId,
      });
      this.props.setRoom(movingTo);
    }
  };

  onWebsocketConnect(ws) {
    // Put websocket in redux store for use throughout application
    this.props.setWebsocketConnection(ws);
    this.setState({
      isConnecting: false,
    });
  }

  render() {
    let style = {
      height: 'inherit',
      width: 'inherit',
    };
    if (this.state.isConnecting) {
      return <div>LOADING...</div>;
    }
    return <div style={style}>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => ({
  ws: state.connection,
  curRoomId: state.lobby.roomId,
  user: state.user,
  lobby: state.lobby,
});
export default connect(mapStateToProps, {
  setWebsocketConnection,
  setRoom,
  setRoomData,
  setUsername,
})(IOWrapper);
