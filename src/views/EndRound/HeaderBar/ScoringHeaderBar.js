import React from 'react';
import { connect } from 'react-redux';

import ScoringButton from './ScoringButton';
import ScoringLetter from './ScoringLetter';
import ScoringPrompt from './ScoringPrompt';
import { isHost } from '../../../utils/scattergories';
import './ScoringHeaderBar.css';
class ScoringHeaderBar extends React.Component {
  scoringButtonClicked = (isBack) => {
    let { lobby, ws, promptInd } = this.props;
    let newInd = isBack ? promptInd - 1 : promptInd + 1;
    if (newInd > -1 && newInd < 10) {
      ws.emit('host-switch-prompt', {
        roomId: lobby.roomId,
        promptInd: newInd,
      });
    }
  };
  render() {
    let { lobby, ws } = this.props;
    let hosting = isHost(lobby, ws);
    return (
      <div id="scoring-header-bar">
        <div id="scoring-header-left">
          <ScoringLetter />
        </div>
        <div id="scoring-header-right">
          {hosting && (
            <ScoringButton
              clickHandler={() => this.scoringButtonClicked(true)}
              text={'<'}
            />
          )}
          <ScoringPrompt />
          {hosting && (
            <ScoringButton
              clickHandler={() => this.scoringButtonClicked(false)}
              text={'>'}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
    lobby: state.lobby,
    promptInd: state.gameFlow.currentPrompt,
  };
};
export default connect(mapStateToProps, {})(ScoringHeaderBar);
