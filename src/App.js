import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import history from './utils/history';
import Login from './views/Login/Login';
import './App.css';
import LobbyView from './views/Lobby/LobbyView';
import GameLobby from './views/Lobby/GameLobby';
import GameView from './views/GameView/GameView';

class App extends React.Component {
  render() {
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
          <Route path="/game/:roomId" exact>
            <GameView />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(null, {})(App);
