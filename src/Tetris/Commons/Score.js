const Score = {
  linePoints: (level, line) => {
    if (level < 0) {
      return 0;
    }

    switch (line) {
      case 0:
        return 40 * (level + 1);
      case 1:
        return 100 * (level + 1);
      case 2:
        return 300 * (level + 1);
      case 3:
        return 1200 * (level + 1);
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
