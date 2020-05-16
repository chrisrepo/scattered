import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import history from './utils/history';
import Login from './views/Login/Login';
import './App.css';
import LobbyView from './views/Lobby/LobbyView';
import GameLobby from './views/Lobby/GameLobby';
import GameView from './views/GameView/GameView';
import IOWrapper from './IOWrapper';
import RouteWrap from './RouteWrap';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <IOWrapper />
        <Switch>
          <Route path="/" exact>
            <RouteWrap>
              <Login />
            </RouteWrap>
          </Route>
          <Route path="/lobby" exact>
            <RouteWrap>
              <LobbyView />
            </RouteWrap>
          </Route>
          <Route path="/lobby/:roomId" exact>
            <RouteWrap>
              <GameLobby />
            </RouteWrap>
          </Route>
          <Route path="/lobby" exact>
            <RouteWrap>
              <LobbyView />
            </RouteWrap>
          </Route>
          <Route path="/game/:roomId" exact>
            <RouteWrap>
              <GameView />
            </RouteWrap>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(null, {})(App);
