function getLetter(letterList, curLetter) {
  let randInd = Math.floor(Math.random() * Math.floor(letterList.length));
  if (!curLetter) {
    return letterList[randInd];
  } else if (curLetter === letterList[randInd]) {
    //just go one up or down
    if (randInd - 1 >= 0) {
      return letterList[randInd - 1];
    } else {
      return letterList[randInd + 1];
    }
  }
  return letterList[randInd];
}

module.exports = { getLetter };
