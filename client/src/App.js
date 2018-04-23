import React, { Component } from 'react';
import MatchRow from './MatchRow.react.js'
import CollapsibleTree from './CollapsibleTree.react.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      matches: [],
      matchData: null
    }
    this._handleClickRow = this._handleClickRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.callApi();
  }

  callApi = async () => {
    const response = await fetch('api/player/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        playername: this.state.value,
      },
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState(
      {
        matches: body,
        targetPlayer: this.state.value,
        matchData: null
      }
    );
  };

  render() {
    return (
      <div className="App">
        <div className="background">
           <div className="searchbox-container">
             <form className="searchbox" onSubmit={this.handleSubmit}>
               <input
                 className="search"
                 placeholder="Enter Username"
                 value={this.state.value}
                 onChange={this.handleChange} />
                 <input type="submit" value="Get Recent Matches" />
             </form>
           </div>
         </div>
         {this._renderMatches()}
         {this._renderMatchTree()}
      </div>
    );
  }

  _renderMatchTree() {
    if (!this.state.matchData) {
      return null;
    }
    return <CollapsibleTree data={null}/>;
  }

  _renderMatches(): React.Node {
    if (
      this.state.matches === null ||
      this.state.matches.length === 0 ||
      this.state.matchData
    ) {
      return null;
    }
    const matches =
    (this.state.matches || []).map((match, index) => {
      return (
        <MatchRow
          className="matchRow"
          key={index}
          matchData={match}
          onClick={this._handleClickRow}
        />
      );
    });

    return (
      <div>
        <span className="matchesHeader">
          Matches:
        </span>
        {matches}
      </div>
    );
  }

  _handleClickRow = (matchID) => {
    console.log(matchID);
    //TODO: call server with matchID, get tree back and put it in this.state.matchData
    this.setState({matchData: 1});
  }
}

export default App;
