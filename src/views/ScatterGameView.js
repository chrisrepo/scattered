import React from 'react';
import { connect } from 'react-redux';

import { setPrompts, setSelectedPrompt } from '../redux/actions';
import LetterView from './LetterView';
import TimerView from './TimerView';
import ScattergoriesView from './ScattergoriesView';

import { getPrompts } from '../utils/scattergories';

import './ScatterGameView.css';
class ScatterGameView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPrompt: -1,
    };
  }

  componentDidMount() {
    this.props.setPrompts(getPrompts(10));
  }

  onSelect = (ind) => {
    this.props.setSelectedPrompt(ind);
  };

  onKeyPress = (event) => {
    if (
      (event.key === 'Enter' || event.key === 'Tab') &&
      this.props.selectedPrompt !== -1
    ) {
      console.log('keypres');
      if (this.props.selectedPrompt === this.props.prompts.length - 1) {
        this.props.setSelectedPrompt(-1);
      } else {
        this.props.setSelectedPrompt(this.props.selectedPrompt + 1);
      }
    }
  };

  render() {
    return (
      <div id="scatter-game-view">
        <div id="scatter-game-left">
          <LetterView letter={'F'} />
          <TimerView timeLeft={120} />
        </div>
        <div id="scatter-game-right">
          <ScattergoriesView
            prompts={this.props.prompts}
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
  };
};
export default connect(mapStateToProps, { setPrompts, setSelectedPrompt })(
  ScatterGameView
);
