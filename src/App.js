import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import history from './utils/history';
import ScatterGameView from './views/GameView/ScatterGameView';
import ScoringView from './views/EndRound/ScoringView';
import Login from './views/Login/Login';
import './App.css';
import LobbyView from './views/Lobby/LobbyView';
import GameLobby from './views/Lobby/GameLobby';

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
          <Route path="/play" exact>
            <ScoringView />
            {false && <ScatterGameView />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(null, {})(App);
