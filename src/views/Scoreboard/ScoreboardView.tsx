import React from 'react';
import { connect } from 'react-redux';
import { Scoreboard } from '../../redux/actions/gameFlow';
import UserScore from './UserScore';
const tempStyle = {
  width: '25%',
};

interface AppProps {
  scoreboard: Scoreboard;
}
class ScoreboardView extends React.Component<AppProps> {
  renderScores = () => {
    let userKeys = Object.keys(this.props.scoreboard);
    return userKeys.map((key) => {
      const user = this.props.scoreboard[key];
      return <UserScore key={key} user={user} />;
    });
  };
  render() {
    return (
      <div style={tempStyle}>
        <div>Scoreboard</div>
        {this.renderScores()}
      </div>
    );
  }
}

interface State {
  gameFlow: {
    scoreboard: Scoreboard;
  };
}
const mapStateToProps = (state: State) => {
  return {
    scoreboard: state.gameFlow.scoreboard,
  };
};
export default connect(mapStateToProps, {})(ScoreboardView);
