import React from 'react';
import { connect } from 'react-redux';
import Main from './components/Main';
import Login from './components/Login';
import './App.css';
import Counter from './components/Counter';
import LeaderBoard from './components/LeaderBoard';

class App extends React.Component {
  render() {
    const { login, main, startCounter, leaderBoard } = this.props;
    return (
      <div className="game-main">
        {login && <Login />}
        {startCounter && <Counter />}
        {main && <Main />}
        {leaderBoard && <LeaderBoard />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.loginDone,
  main: state.mainScreen,
  startCounter: state.startCounter,
  leaderBoard: state.leaderBoard,
});

export default connect(mapStateToProps)(App);
