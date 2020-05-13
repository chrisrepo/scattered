import React from 'react';

import './Users.css';

const colors = ['darkgreen', 'darkblue', 'red', 'orange', 'purple'];
class Users extends React.Component {
  getRandomColor() {
    let ind = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[ind];
  }
  renderUsers() {
    if (!this.props.users) {
      return null;
    }
    return Object.keys(this.props.users).map((key) => {
      const user = this.props.users[key];
      return (
        <div
          key={key}
          className="user"
          style={{ backgroundColor: this.getRandomColor() }}
        >
          {user.username}
        </div>
      );
    });
  }
  render() {
    return (
      <div id="user-list-container">
        <div id="user-list-header">Users</div>
        <div id="user-list">{this.renderUsers()}</div>
      </div>
    );
  }
}

export default Users;
