import React from 'react';
import { connect } from 'react-redux';

import ScoringButton from './ScoringButton';
import ScoringLetter from './ScoringLetter';
import ScoringPrompt from './ScoringPrompt';
import { isHost } from '../../../utils/scattergories';
import './ScoringHeaderBar.css';
import NextRoundButton from './NextRoundButton';
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

  renderScoringBar = (hosting) => {
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
  };

  nextRoundButtonClicked = () => {
    let { lobby, ws } = this.props;
    ws.emit('host-end-scoring', {
      roomId: lobby.roomId,
    });
  };

  renderNextRoundButton = () => {
    // TODO: Implement next round logic (may want a warning if user clicks when not on last prompt)
    return (
      <div id="next-round-button" onClick={this.nextRoundButtonClicked}>
        Finish Scoring and Next Round
      </div>
    );
  };
  render() {
    let { lobby, ws, promptInd } = this.props;
    let hosting = isHost(lobby, ws);
    return (
      <React.Fragment>
        {this.renderScoringBar(hosting)}
        {hosting && (
          <NextRoundButton lobby={lobby} ws={ws} promptInd={promptInd} />
        )}
      </React.Fragment>
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
