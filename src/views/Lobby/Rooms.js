import React from 'react';

import './Rooms.css';
class Rooms extends React.Component {
  renderRooms() {
    const keys = Object.keys(this.props.rooms).filter(
      (key) => key !== this.props.roomId
    );
    console.log(keys, this.props.roomId);
    return keys.map((key) => {
      const roomData = this.props.rooms[key];
      const playerCount = Object.keys(roomData).length;
      return (
        <div key={key} className="room">
          <h2 className="room-name">{key}</h2>
          <p className="room-players">{playerCount} Players</p>
        </div>
      );
    });
  }

  render() {
    return <div id="lobby-rooms-container">{this.renderRooms()}</div>;
  }
}

export default Rooms;
