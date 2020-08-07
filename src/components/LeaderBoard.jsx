import React from 'react';
import { connect } from 'react-redux';
import { playAgain, startNewPlayer } from '../actions/actions';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoard: [],
    };
  }

  componentDidMount() {
    const { leaderBoard } = this.props;
    leaderBoard.sort((a, b) => {
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      return 0;
    });
    this.setState({ leaderBoard });
  }

  render() {
    const { playAgain, startNewPlayer } = this.props;
    const { leaderBoard } = this.state;
    return (
      <div className="leaderboard">
        <h1>Leader Board</h1>
        <div className="all-scores">
          {leaderBoard.map((e) => (
            <div className="player-info-leaderboard">
              <div className="in-line">
                <div>
                  <img src={`https://www.countryflags.io/${e.countryCode}/shiny/64.png`} alt="" />
                  <span>{e.player}</span>
                </div>
                {(e.player !== '') && <span>{`${e.points} points`}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="leaderboard-buttons">
          <button onClick={() => playAgain()}>Play Again</button>
          <button onClick={() => startNewPlayer()}>New Player</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  leaderBoard: state.leaderBoardScores,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(playAgain()),
  startNewPlayer: () => dispatch(startNewPlayer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
