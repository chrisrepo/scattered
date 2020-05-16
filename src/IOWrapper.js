import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

import {
  setWebsocketConnection,
  setRoomData,
  setRoom,
  setUsername,
} from './redux/actions';
import { getRoomIdFromPathName, isGame } from './utils/history';

class IOWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: true,
    };
    const ws = io();
    ws.on('connect', () => {
      this.onWebsocketConnect(ws);
      const pathname = window.location.pathname;
      // Reconnection/Connection logic
      if (pathname !== '/') {
        this.handleInitialConnection(ws);
      }
    });

    ws.on('log-in-success', () => {
      const pathname = window.location.pathname;
      if (pathname !== '/') {
        this.joinInitialRoom();
      }
    });

    ws.on('update-room', (data) => {
      this.props.setRoomData(data.roomData);
    });
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  joinInitialRoom = () => {
    let joining = getRoomIdFromPathName(window.location.pathname);
    if (joining) {
      let joiningGameRoom = isGame(window.location.pathname);
      this.props.ws.emit('switch-room', {
        roomId: joining,
      });
      this.props.setRoom(joining);
      // If they're joining a game room, send them back to game lobby (so they can rejoin the game)
      //    easier than saving data right here saying we are reconnecting to game, then on next update-room (which has all initial room data), actually doing the work
      if (joiningGameRoom) {
        this.props.history.push(`/lobby/${joining}`);
      }
    }
  };

  // Page reload logic
  handleInitialConnection = (ws) => {
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
    this.props.ws.emit('log-in', body);
  };

  onBackButtonEvent = (event) => {
    //Detected a back button event & make sure redux knows about it
    let movingTo = getRoomIdFromPathName(window.location.pathname);
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
  }

  render() {
    let style = {
      display: 'none',
    };
    return <div style={style}></div>;
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
})(withRouter(IOWrapper));
