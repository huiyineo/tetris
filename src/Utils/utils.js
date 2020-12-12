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

  printBlock: (block) => {
    let output = "";
    const rowLen = block.content.length;
    console.log(block.name);

    for (let i = 0; i < rowLen; i++) {
      const colLen = block.content[i].length;

      for (let j = 0; j < colLen; j++) {
        output += block.content[i][j].toString().padStart(5, " ");
      }
      output += "\n";
    }
    console.log(output);
  },

  putBlockInSquare: (block, startX, startY) => {
    const matrix = [];
    const content = block.content;
    const blockRow = content.length;
    const blockCol = content[0].length;
    const size = Math.max(blockRow, blockCol);

    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if (
          i - startX >= 0 &&
          j - startY >= 0 &&
          i < blockRow + startX &&
          j < blockCol + startY
        ) {
          matrix[i][j] = content[i - startX][j - startY];
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  },

  rotateBlock: (block) => {
    if (block.name === "O") {
      return block;
    }

    const tetris = {
      I: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],
      J: [
        [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
        [
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 0, 1],
        ],
      ],
      L: [
        [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
        [
          [0, 0, 1],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
      ],
      S: [
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
      ],
      T: [
        [
          [0, 1, 0],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
      ],
      Z: [
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
      ],
    };
    const relTransformList ={
      I: [[-2, 1],[1, -1],[-1, 2],[2, -2],],
      J: [[-1, 0],[0, 0],[0, 1],[1, -1],],
      L: [[-1, 0],[0, 0],[0, 1],[1, -1],],
      S: [[-1, 0],[0, 0],[0, 1],[1, -1],],
      T: [[0, 0],[0, 1],[1, -1],[-1, 0],],
      Z: [[-1, 0],[0, 0],[0, 1],[1, -1],],}

    const blocks = tetris[block.name];
    const relTransform = relTransformList[block.name];

    let nextIdx = (block.index + 1) % relTransform.length;
    block.content = blocks[nextIdx % blocks.length];
    block.index = nextIdx;
    
    block.transformX = relTransform[nextIdx][0];
    block.transformY = relTransform[nextIdx][1];

    return block;    
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
    let rotated = square;
    if (square[0][0] > 0 || square[0][1] > 0) {
      rotated = utils.rotateMatrix(rotated);
      rotated = utils.rotateMatrix(rotated);
    }
    rotated = utils.rotateMatrix(rotated);

    return rotated;
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
