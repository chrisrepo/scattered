import prompts from '../constants/categories';

export const getPrompts = (numOfPrompts) => {
  //TODO: Handle getting prompts server side (randomize or actually remove from list each time);
  return prompts.slice(0, numOfPrompts);
};

export const isHost = (lobby, ws) => {
  if (
    ws &&
    lobby &&
    lobby.roomData[lobby.roomId] &&
    ws.id === lobby.roomData[lobby.roomId].host
  ) {
    return true;
  }
  return false;
};
