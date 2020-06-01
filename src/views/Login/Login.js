import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setUser, clearLobbyData } from '../../redux/actions';
import { getRandomEmoji } from '../../utils/common';

import './Login.css';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      connecting: false,
    };
  }
  componentDidMount() {
    this.props.clearLobbyData();
  }

  playButtonClicked = () => {
    this.setState({
      connecting: true,
    });
    const username = this.inputRef.current.value;

    if (username.length > 0) {
      const emoji = getRandomEmoji();
      // Store username in redux & session storage (so refreshes mean we can relog in the user)
      this.props.setUser({ username, emoji });
      sessionStorage.setItem('sc-user', username);
      const body = {
        emoji,
        username,
      };

      // Log in (and save user on backend)
      // Maybe show loading screen here
      this.props.ws.emit('log-in', body);
    }
  };

  render() {
    return (
      <div id="login-container">
        <div id="login-header">
          <div id="game-name">Scattered</div>
          <div id="game-subheader">'Scattergories Online'</div>
        </div>
        <div id="login-field">
          <label id="login-label">Name</label>
          <input
            autoComplete="off"
            id="login-input"
            ref={this.inputRef}
            type="text"
          />
        </div>
        <button id="login-button" onClick={this.playButtonClicked}>
          Play
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ws: state.connection,
});
export default connect(mapStateToProps, { setUser, clearLobbyData })(
  withRouter(Login)
);
