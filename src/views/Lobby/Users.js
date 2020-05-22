import React from 'react';

import { getRandomEmoji } from '../../utils/common';
import Emoji from '../../Emoji';
import './Users.css';

class Users extends React.Component {
  renderUsers() {
    if (!this.props.users) {
      return null;
    }
    return Object.keys(this.props.users).map((key) => {
      const user = this.props.users[key];
      // TODO: Save emojis on login/load so every user sees the same emoji for a given user
      // https://unicode.org/emoji/charts/full-emoji-list.html
      const emoji1 = getRandomEmoji();
      const emoji2 = getRandomEmoji();
      return (
        <div key={key} className="user">
          <Emoji label="test" symbol={emoji1} />
          <span className="username">{user.username}</span>
          <Emoji label="test" symbol={emoji2} />
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
