import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setUsername } from '../../redux/actions';

import './Login.css';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      connecting: false,
    };
  }

  playButtonClicked = () => {
    this.setState({
      connecting: true,
    });
    const username = this.inputRef.current.value;

    if (username.length > 0) {
      this.props.setUsername(username);
      this.props.history.push('/lobby');
    }
  };

  render() {
    return (
      <div id="login-container">
        <h1>Scattergories</h1>
        <div id="login-field">
          <label id="login-label">Name</label>
          <input id="login-input" ref={this.inputRef} type="text" />
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
export default connect(mapStateToProps, { setUsername })(withRouter(Login));
