import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChatBox from './ChatBox';
import HostOptions from './HostOptions';
import { isHost } from '../../utils/scattergories';
import { setPrompts, setLetter } from '../../redux/actions';
import './GameLobby.css';
class GameLobby extends React.Component {
  componentDidMount() {
    const route = `/game/${this.props.lobby.roomId}`;
    this.props.ws.on('emit-start-game', (data) => {
      // TODO: on rejoin, there will probably be more data to handle from this emit
      let { letter, prompts } = data;
      this.props.setLetter(letter);
      this.props.setPrompts(prompts);
      this.props.history.push(route);
    });
  }
  componentWillUnmount() {
    this.props.ws.off('emit-start-game');
  }
  render() {
    const started = this.props.lobby.roomData[this.props.lobby.roomId].started;
    const hosting = isHost(this.props.lobby, this.props.ws);
    return (
      <div id="game-lobby-container">
        {!hosting && started && (
          <div
            onClick={() =>
              this.props.ws.emit('host-start-game', {
                roomId: this.props.lobby.roomId,
              })
            }
          >
            Join Game In Progress
          </div>
        )}
        {hosting && <HostOptions />}
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

export default connect(mapStateToProps, { setLetter, setPrompts })(
  withRouter(GameLobby)
);
