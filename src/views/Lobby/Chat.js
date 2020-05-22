import React from 'react';
import { connect } from 'react-redux';

import './Chat.css';
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      inputVal: '',
    };
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.ws.on('emit-chat', (data) => {
      this.addChatMessage(data.username, data.message);
    });
    this.addChatMessage(
      undefined,
      `You have joined the ${this.props.lobby.roomId} chat`
    );
  }

  componentWillUnmount() {
    this.props.ws.off('emit-chat');
  }

  updateInput = (e) => {
    this.setState({
      inputVal: e.target.value,
    });
  };

  sendChatMessage = () => {
    if (this.state.inputVal) {
      let body = {
        roomId: this.props.lobby.roomId,
        username: this.props.user.username,
        message: this.state.inputVal,
      };
      this.props.ws.emit('on-chat', body);
      this.setState({ inputVal: '' });
    }
  };

  addChatMessage = (username, message) => {
    if (this._isMounted) {
      this.setState({
        messages: [...this.state.messages, { user: username, text: message }],
      });
    }
  };

  renderChat() {
    return this.state.messages.map((msg, index) => {
      let userPrefix = '';
      if (msg.user) {
        userPrefix = (
          <span className="chat-identifier">
            <span className="chat-user">{msg.user}:</span>
          </span>
        );
      }
      const messageClass = `chat-message${msg.user ? '' : ' system'}`;
      return (
        <span key={index} className="chat-message-container">
          {userPrefix}

          <span className={messageClass}>{msg.text}</span>
        </span>
      );
    });
  }

  renderInput() {
    return (
      <div id="chat-input">
        <input
          type="text"
          value={this.state.inputVal}
          onChange={(e) => this.updateInput(e)}
        />
        <button onClick={() => this.sendChatMessage()}>Send</button>
      </div>
    );
  }

  render() {
    return (
      <div id="chat-container">
        <div id="chat-messages">{this.renderChat()}</div>
        {this.renderInput()}
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
export default connect(mapStateToProps, {})(Chat);
