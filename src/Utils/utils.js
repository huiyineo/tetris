const utils = {
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  randomFromArray: (arr) => arr[utils.random(0, arr.length - 1)],

  printMatrix: (matrix) => {
    let output = "";
    const rowLen = matrix.length;

    for (let i = 0; i < rowLen; i++) {
      const colLen = matrix[i].length;

      for (let j = 0; j < colLen; j++) {
        output += matrix[i][j].toString().padStart(5, " ");
      }
      output += "\n";
    }
    console.log(output);
  },

  rotateMatrix: (square) => {
    const len = square.length;
    const rotatedMatrix = [];

    for (let i = 0; i < len; i++) {
      rotatedMatrix[i] = [];
      for (let j = 0; j < len; j++) {
        rotatedMatrix[i][j] = square[len - j - 1][i];
      }
    }

    return rotatedMatrix;
  },

  rotateMatrixSpecial: (square) => {
    const lastIdx = square.length - 1;
    const rotatedMatrix = [];

    for (let i = lastIdx; i >= 0; i--) {
      rotatedMatrix[i] = [];
      for (let j = lastIdx; j >= 0; j--) {
        rotatedMatrix[i][j] = square[lastIdx - j][lastIdx - i];
      }
    }

    return rotatedMatrix;
  },

  blockToMatrix: (block, row, col) => {
    const matrix = [];
    const blockRow = block.length;
    const blockCol = block[0].length;

    for (let i = 0; i < row; i++) {
      matrix[i] = [];
      for (let j = 0; j < col; j++) {
        if (i < blockRow && j < blockCol) {
          matrix[i][j] = block[i][j];
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  },
};

export default utils;
