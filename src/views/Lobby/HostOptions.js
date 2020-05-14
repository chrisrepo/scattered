import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './HostOptions.css';
class HostOptions extends React.Component {
  render() {
    if (!this.props.ws || this.props.lobby.roomId === 'Lobby') {
      return <div>LOADING</div>;
    }
    return <div id="game-room-container">test game room</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    ws: state.connection,
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, {})(withRouter(HostOptions));
