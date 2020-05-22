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

export const PATH_TYPES = {
  LOBBY: 'Lobby',
  GAME: 'Game',
};
const pathToType = {
  lobby: 'Lobby',
  lobbyCharmander: 'Lobby',
  lobbySquirtle: 'Lobby',
  lobbyBulbasaur: 'Lobby',
  lobbyPikachu: 'Lobby',
  gameCharmander: 'Game',
  gameSquirtle: 'Game',
  gameBulbasaur: 'Game',
  gamePikachu: 'Game',
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

export const getPathType = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return pathToType[trimmed];
};

export const isGame = (pathname) => {
  let trimmed = pathname.replace(/\//g, '');
  return isGameMap[trimmed];
};
