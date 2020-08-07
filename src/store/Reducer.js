const Reducer = (state = {
  loginDone: true, mainScreen: false, startCounter: false, leaderBoard: false, player: '', countryCode: '', leaderBoardScores: [{ player: '', countryCode: '', points: '' }],
}, action) => {
  switch (action.type) {
    case 'CREATE USER': return { ...state, loginDone: false, startCounter: true };
    case 'START GAME': return { ...state, startCounter: false, mainScreen: true };
    case 'SHOW LEADERBOARD': return { ...state, mainScreen: false, leaderBoard: true };
    case 'REMOVE LOGIN': return { ...state, startCounter: true, mainScreen: false };
    case 'PLAY AGAIN': return { ...state, leaderBoard: false, startCounter: true };
    case 'NEW PLAYER': return { ...state, leaderBoard: false, loginDone: true };
    case 'SAVE PLAYER INFO': return { ...state, player: action.player, countryCode: action.countryCode };
    case 'SAVE SCORE': return { ...state, leaderBoardScores: [...state.leaderBoardScores, { player: action.player, countryCode: action.countryCode, points: action.points }] };
    default: return state;
  }
};

export default Reducer;
