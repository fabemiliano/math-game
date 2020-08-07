const changeLogin = () => ({ type: 'CREATE USER' });
const removeLogin = () => ({ type: 'REMOVE LOGIN' });
const startGame = () => ({ type: 'START GAME' });
const savePlayerInfo = (player, countryCode) => ({ type: 'SAVE PLAYER INFO', player, countryCode });
const showLeaderboard = () => ({ type: 'SHOW LEADERBOARD' });
const playAgain = () => ({ type: 'PLAY AGAIN' });
const startNewPlayer = () => ({ type: 'NEW PLAYER' });
const saveScore = (player, countryCode, points) => ({
  type: 'SAVE SCORE', player, countryCode, points,
});

export {
  changeLogin, removeLogin, savePlayerInfo, startGame, showLeaderboard, playAgain, startNewPlayer, saveScore,
};
