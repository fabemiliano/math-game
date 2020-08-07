import React from 'react';
import { connect } from 'react-redux';
import { removeLogin, showLeaderboard, saveScore } from '../actions/actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      points: 0,
      left: '',
      right: '',
      operator: '',
      timer: 15,
      mainTimer: 120,
      borderStyle: 'black',
    };
  }

  componentDidMount() {
    this.generateQuestion();
    setInterval(() => {
      const { timer, mainTimer, points } = this.state;
      const {
        goToLeaderBoard, saveScore, player, countryCode,
      } = this.props;
      if (timer > 0) {
        this.setState((state) => ({ mainTimer: state.mainTimer - 1, timer: state.timer - 1 }));
      } else {
        this.setState((state) => ({ mainTimer: state.mainTimer - 1, timer: 15 }));
        this.generateQuestion();
      }
      if (mainTimer === 0) {
        goToLeaderBoard();
        saveScore(player, countryCode, points);
      }
    }, 1000);
  }

  answerInput() {
    const { answer, borderStyle } = this.state;
    return (
      <input
        style={{ border: `3px solid ${borderStyle}` }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            this.setState({ answer: '', timer: 15 });
            this.changeScore();
            this.generateQuestion();
          }
        }}
        onChange={(e) => this.setState({ answer: e.target.value })}
        value={answer}
      />
    );
  }

  changeScore() {
    const {
      answer, left, right, operator, timer,
    } = this.state;
    switch (operator) {
      case 1: if (left * right === Number(answer)) {
        this.setState((state) => ({ points: state.points + timer, borderStyle: 'green' }));
      } else {
        this.setState((state) => ({ points: state.points - timer, borderStyle: 'red' }));
      } break;
      case 2: if (left + right === Number(answer)) {
        this.setState((state) => ({ points: state.points + timer, borderStyle: 'green' }));
      } else {
        this.setState((state) => ({ points: state.points - timer, borderStyle: 'red' }));
      } break;
      default: if (left - right === Number(answer)) {
        this.setState((state) => ({ points: state.points + timer, borderStyle: 'green' }));
      } else {
        this.setState((state) => ({ points: state.points - timer, borderStyle: 'red' }));
      }
    }
  }

  generateQuestion() {
    const { points } = this.state;
    const operator = Math.floor(Math.random() * 3);
    let left;
    let right;
    if (points < 100) {
      left = Math.floor(Math.random() * 10);
      right = Math.floor(Math.random() * 10);
    } else if (points < 200) {
      left = Math.floor(Math.random() * 100);
      right = Math.floor(Math.random() * 10);
    } else if (points < 300) {
      left = Math.floor(Math.random() * 100);
      right = Math.floor(Math.random() * 100);
    } else if (points < 400) {
      left = Math.floor(Math.random() * 1000);
      right = Math.floor(Math.random() * 100);
    } else {
      left = Math.floor(Math.random() * 1000);
      right = Math.floor(Math.random() * 1000);
    }
    this.setState({ left, right, operator });
  }

  renderPoits() {
    const { points } = this.state;
    return (
      <p>{`${points} points`}</p>
    );
  }

  static renderQuestion(operator, left, right) {
    switch (operator) {
      case 1: return (<p>{`${left} x ${right}`}</p>);
      case 2: return (<p>{`${left} + ${right}`}</p>);
      default: return (<p>{`${left} - ${right}`}</p>);
    }
  }

  renderTimer() {
    const { timer } = this.state;
    return (
      <p>{`${timer} s`}</p>
    );
  }

  renderMainTimer() {
    const { mainTimer } = this.state;
    return (
      <p className="main-timer">{new Date(mainTimer * 1000).toISOString().substr(11, 8)}</p>
    );
  }

  render() {
    const {
      left, right, operator, points,
    } = this.state;
    const {
      undoLogin, player, countryCode, goToLeaderBoard, saveScore,
    } = this.props;
    return (
      <div className="main-container">
        <div className="up-bar">
          <div className="player-info-main">
            <img src={`https://www.countryflags.io/${countryCode}/shiny/64.png`} alt="" />
            <p>{player}</p>
          </div>
          {this.renderMainTimer()}
          {this.renderPoits()}
        </div>
        <div className="answer-area">
          {Main.renderQuestion(operator, left, right)}
          {this.answerInput()}
          {this.renderTimer()}
        </div>
        <div className="main-buttons">
          <button onClick={() => undoLogin()} type="button">Start Over</button>
          <button onClick={() => { goToLeaderBoard(); saveScore(player, countryCode, points); }} type="button">Give Up</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  undoLogin: () => dispatch(removeLogin()),
  goToLeaderBoard: () => dispatch(showLeaderboard()),
  saveScore: (player, countryCode, points) => dispatch(saveScore(player, countryCode, points)),
});

const mapStateToProps = (state) => ({
  player: state.player,
  countryCode: state.countryCode,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
