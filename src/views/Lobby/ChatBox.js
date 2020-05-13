import React from 'react';

import Users from './Users';
import Chat from './Chat';

import './ChatBox.css';
class ChatBox extends React.Component {
  render() {
    return (
      <div id="chat-box">
        <Users users={this.props.room} />
        <Chat />
      </div>
    );
  }
}

export default ChatBox;
