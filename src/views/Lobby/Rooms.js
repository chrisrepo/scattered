import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setRoom } from '../../redux/actions';
import './Rooms.css';
class Rooms extends React.Component {
  switchRoom = (roomId) => {
    this.props.ws.emit('switch-room', { roomId, oldId: this.props.roomId });
    this.props.setRoom(roomId);
    this.props.history.push(`/lobby/${roomId}`);
  };

  renderRooms() {
    const keys = Object.keys(this.props.rooms).filter(
      (key) => key !== this.props.roomId
    );
    return keys.map((key) => {
      const roomData = this.props.rooms[key].users
        ? this.props.rooms[key].users
        : {};
      const playerCount = Object.keys(roomData).length;
      const playerText = playerCount === 1 ? ' Player' : ' Players';
      return (
        <div key={key} className="room" onClick={() => this.switchRoom(key)}>
          <h2 className="room-name">{key}</h2>
          <p className="room-players">
            {playerCount}
            {playerText}
          </p>
        </div>
      );
    });
  }

  render() {
    return <div id="lobby-rooms-container">{this.renderRooms()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
  };
};
export default connect(mapStateToProps, { setRoom })(withRouter(Rooms));
