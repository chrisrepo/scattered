import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class LobbyView extends React.Component {
  componentDidMount() {
    // Reroute if username empty
    if (!this.props.user.username) {
      this.props.history.push('/');
    }
    this.props.ws.on('emit-join-lobby', (data) => {
      console.log('lobby data', data);
    });
    const body = {
      username: this.props.user.username,
    };
    this.props.ws.emit('join-lobby', body);
  }
  render() {
    return <div>LOBBY</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    ws: state.connection,
  };
};

export default connect(mapStateToProps, {})(withRouter(LobbyView));
