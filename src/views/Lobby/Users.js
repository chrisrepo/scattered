import React from 'react';

import Emoji from '../../Emoji';
import './Users.css';

class Users extends React.Component {
  renderUsers() {
    if (!this.props.users) {
      return null;
    }
    return Object.keys(this.props.users).map((key) => {
      const user = this.props.users[key];
      return (
        <div key={key} className="user">
          <Emoji label="test" symbol={user.emoji} />
          <span className="username">{user.username}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div id="user-list-container">
        <div id="user-list">{this.renderUsers()}</div>
      </div>
    );
  }
}

export default Users;
