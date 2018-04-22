import React, { Component } from 'react';
import './App.css';

class MatchRow extends Component {
  render() {
    const {matchData} = this.props;
    let createdAt = matchData.createdAt.replace('T', ', ').replace(/-/g, '/');
    createdAt = createdAt.substring(0, createdAt.length - 4);
    return (
      <div className='matchRow'>
        <div
          className='matchData'
          onClick={() => this.props.onClick(this.props.matchData.match_id)}>
          {'Created: '}{createdAt}
          {', Duration: '}{Math.floor(matchData.duration / 60)}
          {' minutes, Mode: '}{matchData.game_mode}
          {', Kills: '}{matchData.kills}
          {', Placement:  '}{matchData.winPlace}
        </div>
      </div>
    );
  }
}

export default MatchRow;
