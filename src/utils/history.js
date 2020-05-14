// Inside /utils/history.js
import { createBrowserHistory as createHistory } from 'history';
export default createHistory();

const pathToRoomMap = {
  lobby: 'Lobby',
  lobbyCharmander: 'Charmander',
  lobbySquirtle: 'Squirtle',
  lobbyBulbasaur: 'Bulbasaur',
  lobbyPikachu: 'Pikachu',
};
export const getRoomIdFromPathName = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return pathToRoomMap[trimmed];
};
