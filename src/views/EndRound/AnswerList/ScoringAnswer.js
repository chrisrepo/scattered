import React from 'react';
import { connect } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

class ScoringAnswer extends React.Component {
  scoringButtonClicked = (getsPoint) => {
    let body = {
      roomId: this.props.roomId,
      promptInd: this.props.promptInd,
      userId: this.props.userId,
      earnedPoint: !getsPoint,
    };
    console.log('change answer', body);
    this.props.ws.emit('host-change-answer-score', body);
  };

  render() {
    let { user, text, getsPoint } = this.props;
    return (
      <div className="scoring-answer-container">
        <div className="user">{user}</div>
        <div className="border"></div>
        <div className="user-answer">{text}</div>
        <div
          onClick={() => this.scoringButtonClicked(getsPoint)}
          className={`scoring-button${getsPoint ? ' scored' : ''}`}
        >
          <FaCheck />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ws: state.connection,
    promptInd: state.gameFlow.currentPrompt,
    roomId: state.lobby.roomId,
  };
};

export default connect(mapStateToProps, {})(ScoringAnswer);
