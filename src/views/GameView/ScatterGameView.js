import React from 'react';
import { connect } from 'react-redux';

import LetterView from './LetterView';
import TimerView from './TimerView';
import ScattergoriesView from './ScattergoriesView';

import {
  setPrompts,
  setLetter,
  setSelectedPrompt,
  setGameStatus,
} from '../../redux/actions';
import { isHost } from '../../utils/scattergories';
import { GAME_STATUS } from '../../constants/gameFlow';

import './ScatterGameView.css';
class ScatterGameView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPrompt: -1,
    };
  }

  componentDidMount() {
    this.props.ws.on('emit-change-letter', (data) => {
      let { letter } = data;
      this.props.setLetter(letter);
    });
    this.props.ws.on('emit-start-round', (data) => {
      console.log('round started: ', data);
      //TODO: set initial values
      this.props.setGameStatus(data.gameStatus);
      //TODO: start timer countdown
    });
    this.props.ws.on('emit-end-round', (data) => {
      // TODO:
    });
  }

  onSelect = (ind) => {
    if (this.props.gameFlow.gameStatus === GAME_STATUS.ROUND_STARTED) {
      this.props.setSelectedPrompt(ind);
    }
  };

  // Handle Enter/Shift/Shift+Tab events for easy prompt navigation
  // TODO: probably should move this to subcomponent
  onKeyPress = (event) => {
    if (this.props.gameFlow.gameStatus === GAME_STATUS.ROUND_STARTED) {
      if (
        (event.key === 'Enter' || event.key === 'Tab') &&
        this.props.selectedPrompt !== -1
      ) {
        console.log('shiftkeypress?', event.shiftKey);
        let move = event.shiftKey ? -1 : 1;
        let out = event.shiftKey
          ? this.props.selectedPrompt === 0
          : this.props.selectedPrompt === this.props.prompts.length - 1;
        if (out) {
          this.props.setSelectedPrompt(-1);
        } else {
          this.props.setSelectedPrompt(this.props.selectedPrompt + move);
        }
      }
    }
  };

  render() {
    let hosting = isHost(this.props.lobby, this.props.ws);
    return (
      <div id="scatter-game-view">
        <div id="scatter-game-left">
          <LetterView
            isHost={hosting}
            letter={this.props.gameFlow.currentLetter}
          />
          <TimerView timeLeft={120} />
        </div>
        <div id="scatter-game-right">
          <ScattergoriesView
            prompts={this.props.prompts}
            status={this.props.gameFlow.gameStatus}
            selInd={this.props.selectedPrompt}
            onSelect={this.onSelect}
            onKeyPress={this.onKeyPress}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prompts: state.game.prompts,
    selectedPrompt: state.game.selectedPrompt,
    user: state.user,
    ws: state.connection,
    lobby: state.lobby,
    gameFlow: state.gameFlow,
  };
};

export default connect(mapStateToProps, {
  setPrompts,
  setSelectedPrompt,
  setLetter,
  setGameStatus,
})(ScatterGameView);
