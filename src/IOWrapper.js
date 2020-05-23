import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

import {
  setWebsocketConnection,
  setRoomData,
  setRoom,
  setUsername,
  setPrompts,
  setPromptInd,
  setLetter,
  setGameStatus,
  setJoinedInProgress,
  setAnswers,
} from './redux/actions';
import {
  getRoomIdFromPathName,
  getPathType,
  PATH_TYPES,
} from './utils/history';

class IOWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: true,
    };
    const ws = io();
    ws.on('connect', () => {
      this.onWebsocketConnect(ws);
      // Reconnection/Connection logic
      const pathname = window.location.pathname;
      // Only need reconnection logic when not at sign in screen
      if (pathname !== '/') {
        this.handleInitialConnection(ws, pathname);
      }
    });

    ws.on('log-in-success', () => {
      this.joinInitialRoom();
    });

    ws.on('rejoin-success', (data) => {
      const { roomId } = data;
      let type = getPathType(window.location.pathname);
      // Currently we don't have anything, but it's possible we'll need to set some initial state data that the websocket returns
      switch (type) {
        case PATH_TYPES.LOBBY: {
          // Handle lobby specific data
          break;
        }
        case PATH_TYPES.GAME: {
          // Handle game specific data
          console.log('need to fetch game data on rejoin');
          ws.emit('join-game', { roomId });
          break;
        }
        default: {
        }
      }
      // Handle anything that happens regardless of path type
      this.props.setRoom(roomId);
    });

    ws.on('join-game-success', (data) => {
      let { letter, prompts, status, inProgress, answers, promptInd } = data;
      this.props.setLetter(letter);
      this.props.setPrompts(prompts);
      this.props.setPromptInd(promptInd);
      this.props.setGameStatus(status);
      this.props.setJoinedInProgress(inProgress);
      this.props.setAnswers(answers);
    });

    // Could not rejoin game
    ws.on('join-game-failure', (data) => {
      let { roomId } = data;
      console.log(
        'failed to join game in room ',
        roomId,
        ' - rerouting to lobby'
      );
      this.joinInitialRoom(roomId);
      //TODO: maybe show error saying cannot join game
    });

    ws.on('update-room', (data) => {
      this.props.setRoomData(data.roomData);
    });
  }

  // Page reload logic
  handleInitialConnection = (ws, path) => {
    // Before trying to reconnect, make sure there was a username saved in session
    let username = sessionStorage.getItem('sc-user');
    if (!this.props.user.username && username) {
      this.props.setUsername(username);
    }
    // Reroute if username empty
    if (!username && !this.props.user.username) {
      this.props.history.push('/');
    }

    const body = {
      username,
      rejoin: getRoomIdFromPathName(path),
    };
    this.props.ws.emit('log-in', body);
  };

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  joinInitialRoom = (oldId = undefined) => {
    this.props.ws.emit('switch-room', {
      roomId: 'Lobby',
      oldId,
    });
    this.props.setRoom('Lobby');
    this.props.history.push('/lobby');
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
  setLetter,
  setPrompts,
  setGameStatus,
  setJoinedInProgress,
  setAnswers,
  setPromptInd,
})(withRouter(IOWrapper));
