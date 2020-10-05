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

  rotateMatrix: (matrix) => {
    const rowLen = matrix.length;
    const colLen = matrix[0].length;
    const rotatedMatrix = [];

    for (let i = 0; i < rowLen; i++) {
      rotatedMatrix[i] = [];
      for (let j = 0; j < colLen; j++) {
        rotatedMatrix[i][j] = matrix[colLen - j - 1][i];
      }
    }

    return rotatedMatrix;
  },
};

export default utils;
