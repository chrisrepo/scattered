// Inside /utils/history.js
import { createBrowserHistory as createHistory } from 'history';
export default createHistory();

const pathToRoomMap = {
  lobby: 'Lobby',
  lobbyCharmander: 'Charmander',
  gameCharmander: 'Charmander',
  lobbySquirtle: 'Squirtle',
  gameSquirtle: 'Squirtle',
  lobbyBulbasaur: 'Bulbasaur',
  gameBulbasaur: 'Bulbasaur',
  lobbyPikachu: 'Pikachu',
  gamePikachu: 'Pikachu',
};

const isGameMap = {
  gamePikachu: true,
  gameBulbasaur: true,
  gameSquirtle: true,
  gameCharmander: true,
};
export const getRoomIdFromPathName = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return pathToRoomMap[trimmed];
};

export const isGame = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return isGameMap[trimmed];
};
