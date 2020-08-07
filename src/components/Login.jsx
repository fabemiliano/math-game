import React from 'react';
import { connect } from 'react-redux';
import { getCountryCode } from '../services/api';
import { countryList } from '../services/countries';
import { changeLogin, savePlayerInfo } from '../actions/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: '',
      country: 'Brazil',
      countryCode: 'BR',
      buttonEnabled: true,
    };
  }

  render() {
    const { country, countryCode, player, buttonEnabled } = this.state;
    const { doLogin, getPlayerInfo } = this.props;
    return (
      <div className="login-main">
        <div>
          <h1>MATH GAME</h1>
        </div>
        <div className="player-info">
          <p>Your name:</p> 
          <input onChange={(e) => this.setState({ player: e.target.value, buttonEnabled: false })} value={player} />
          <div class="country-selection">
            <p>Choose your country:</p>
            <select
              onChange={(e) => {
                this.setState({ country: e.target.value });
                getCountryCode(e.target.value).then((data) => this.setState({ countryCode: data[0].alpha2Code }));
              }}
              value={country}
            >
              {countryList.map((e) => <option>{e}</option>)}
            </select>
            <img src={`https://www.countryflags.io/${countryCode}/shiny/64.png`} alt="" />
          </div>
          <button onClick={() => { doLogin(); getPlayerInfo(player, countryCode); }} disabled={buttonEnabled} type="button">Start</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: () => dispatch(changeLogin()),
  getPlayerInfo: (player, countryCode) => { dispatch(savePlayerInfo(player, countryCode)); },
});

export default connect(null, mapDispatchToProps)(Login);
