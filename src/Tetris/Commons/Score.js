const Score = {
  linePoints: (level, line) => {
    if (level < 0 || line < 1) {
      return 0;
    }
    level++;
    switch (line) {
      case 1:
        return 40 * level;
      case 2:
        return 100 * level;
      case 3:
        return 300 * level;
      case 4:
        return 1200 * level;
      default:
        return 0;
    }
  },
  //Type: 1 soft dropped, 2 hard dropped
  droppedPoints: (line, type) => {
    if ((type !== 1 && type !== 2) || line > 20 || line < 1) {
      return 0;
    }
    return line * type;
  },
};

export default Score;
