import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/actions';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 3,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { counter } = this.state;
      if (counter === 1) {
        this.setState({ counter: 'GO!' });
      } else if (counter === 'GO') {
        clearInterval();
      } else {
        this.setState((state) => ({ counter: state.counter - 1 }));
      }
    }, 1000);
  }

  render() {
    const { counter } = this.state;
    const { startGame } = this.props;
    if (counter === 'GO!') {
      setTimeout(() => { this.setState({ counter: 3 }); startGame(); }, 1000);
    }
    return (
      <div className="counter-container">
        <p className="counter scale-up-center">{counter}</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch(startGame()),
});

export default connect(null, mapDispatchToProps)(Counter);
