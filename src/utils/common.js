const EMOJIS = require('./emojis');

const safeGetIn = (obj, path, defaultVal = undefined) => {
  if (!obj || !path) return defaultVal;
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (!obj) return defaultVal;
  }
  return obj;
};
const getRandomEmoji = () => {
  let ind = getRandomInt(EMOJIS.length);
  return EMOJIS[ind];
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

module.exports = { safeGetIn, getRandomEmoji };
