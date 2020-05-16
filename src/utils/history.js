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
export const getRoomIdFromPathName = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return pathToRoomMap[trimmed];
};
