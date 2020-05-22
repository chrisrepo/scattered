import React from 'react';
import { connect } from 'react-redux';

import Rooms from './Rooms';
import ChatBox from './ChatBox';

import { safeGetIn } from '../../utils/common';
import './LobbyView.css';
class LobbyView extends React.Component {
  renderSubViews = () => {
    if (
      !safeGetIn(this.props, [
        'lobby',
        'roomData',
        this.props.lobby.roomId,
        'users',
      ])
    ) {
      // TODO: clean loading spinner (current one is trash)
      return <div>LOADING</div>;
    }
    return (
      <React.Fragment>
        <Rooms
          roomId={this.props.lobby.roomId}
          rooms={this.props.lobby.roomData}
        />
        <ChatBox room={this.props.lobby.roomData[this.props.lobby.roomId]} />
      </React.Fragment>
    );
  };
  render() {
    return <div id="lobby-view">{this.renderSubViews()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    lobby: state.lobby,
  };
};

export default connect(mapStateToProps, {})(LobbyView);
