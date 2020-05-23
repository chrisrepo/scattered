import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChatBox from './ChatBox';
import HostOptions from './HostOptions';

import { isHost } from '../../utils/scattergories';
import {
  setPrompts,
  setLetter,
  setGameStatus,
  setScoreboard,
} from '../../redux/actions';
import { safeGetIn } from '../../utils/common';
import './GameLobby.css';
class GameLobby extends React.Component {
  componentDidMount() {
    const route = `/game/${this.props.lobby.roomId}`;
    this.props.ws.on('emit-start-game', (data) => {
      let { letter, prompts, status, scoreboard } = data;
      console.log('gamelobby set prompts');
      this.props.setLetter(letter);
      this.props.setPrompts(prompts);
      this.props.setGameStatus(status);
      this.props.setScoreboard(scoreboard);
      this.props.history.push(route);
    });
  }

  componentWillUnmount() {
    this.props.ws.off('emit-start-game');
  }

  renderSubViews = () => {
    if (
      safeGetIn(this.props, [
        'lobby',
        'roomData',
        this.props.lobby.roomId,
        'users',
      ]) === undefined
    ) {
      //TODO: fix with clean load spinner
      return <div>LOADING</div>;
    }
    const hosting = isHost(this.props.lobby, this.props.ws);
    return (
      <React.Fragment>
        {hosting && <HostOptions />}
        {!hosting && <h2>Waiting for host to start game...</h2>}
        <ChatBox room={this.props.lobby.roomData[this.props.lobby.roomId]} />
      </React.Fragment>
    );
  };
  render() {
    return <div id="game-lobby-container">{this.renderSubViews()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    ws: state.connection,
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, {
  setLetter,
  setPrompts,
  setGameStatus,
  setScoreboard,
})(withRouter(GameLobby));
