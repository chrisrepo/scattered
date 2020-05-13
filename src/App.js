import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import { setWebsocketConnection } from './redux/actions';
import history from './utils/history';
import ScatterGameView from './views/GameView/ScatterGameView';
import ScoringView from './views/EndRound/ScoringView';
import Login from './views/Login/Login';
import './App.css';
import LobbyView from './views/Lobby/LobbyView';
import GameLobby from './views/Lobby/GameLobby';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: true,
    };
    console.log('constructing');
    const ws = io();
    ws.on('connect', () => {
      this.onWebsocketConnect(ws);
    });
  }

  onWebsocketConnect(ws) {
    // Put websocket in redux store for use throughout application
    console.log('connected to websocket', ws);
    this.props.setWebsocketConnection(ws);
    this.setState({
      isConnecting: false,
    });
  }

  render() {
    if (this.state.isConnecting) {
      // TODO: skeleton load?
      return <div>LOADING</div>;
    }
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/lobby" exact>
            <LobbyView />
          </Route>
          <Route path="/lobby/:roomId" exact>
            <GameLobby />
          </Route>
          <Route path="/lobby" exact>
            <LobbyView />
          </Route>
          <Route path="/play" exact>
            <ScoringView />
            {false && <ScatterGameView />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { setWebsocketConnection })(App);
