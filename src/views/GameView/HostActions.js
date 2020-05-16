import React from 'react';
import { connect } from 'react-redux';
import './HostActions.css';

const HostActions = ({ ws, roomId, flow, roundStarted }) => {
  // TODO: Maybe put actions somewhere else
  const changeLetter = () => {
    ws.emit('host-change-letter', { roomId, curLetter: flow.currentLetter });
  };
  const changeLetterAction = (
    <div className="host-action primary" onClick={changeLetter}>
      Change Letter
    </div>
  );
  const startRound = () => {
    ws.emit('host-start-round', { roomId });
  };
  const startRoundAction = (
    <div className="host-action success" onClick={startRound}>
      Start Round
    </div>
  );

  const endRound = () => {
    ws.emit('host-end-round', { roomId });
  };
  const endRoundAction = (
    <div className="host-action danger" onClick={endRound}>
      End Round Early
    </div>
  );

  return (
    <div id="host-actions-container">
      {!roundStarted && changeLetterAction}
      {!roundStarted && startRoundAction}
      {roundStarted && endRoundAction}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    roomId: state.lobby.roomId,
    ws: state.connection,
    flow: state.gameFlow,
  };
};

export default connect(mapStateToProps, {})(HostActions);
