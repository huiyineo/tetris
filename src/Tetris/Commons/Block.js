import utils from "../../Utils/utils";

const Block = {
  pieces: ["I", "J", "L", "O", "S", "T", "Z"],
  blocks: {
    I: [[1], [1], [1], [1]],
    J: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    L: [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    O: [
      [1, 1],
      [1, 1],
    ],
    S: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    Z: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  },
  blocksForNext: {
    I: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    J: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    L: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    O: [
      [1, 1],
      [1, 1],
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    T: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  new: (letter) => {
    return {
      name: letter,
      content: Block.blocks[letter],
      index: 0,
      transformX: 0,
      transformY: letter === "I" ? 1 : 0,
    };
  },

  newSquare: (letter) => {
    return Block.new(letter);
    //const block = Block.new(letter);
    //const len = Math.max(block.content.length, block.content[0].length);
    //block.content = utils.blockToMatrix(block.content, len, len);
    //return block;
  },

  next: (letter) => {
    return {
      name: letter,
      content: Block.blocksForNext[letter],
      index: 0,
      transformX: 0,
      transformY: letter === "I" ? 1 : 0,
    };
  },

  simpleRandom: () => {
    return Block.new(utils.randomFromArray(Block.pieces));
  },

  tgm3RandomNext: () => {
    return Block.next(tgm3Rand.next().value);
  },
  tgm3RandomNew: () => {
    return Block.new(tgm3Rand.next().value);
  },

  tgm3Random: () => {
    return tgm3Rand.next().value;
  },
  newTgm3Random: () => {
    tgm3Rand = tgm3Randomizer();
    return tgm3Rand.next().value;
  },
};

//NOTE: new game need to reset this variable
var tgm3Rand = tgm3Randomizer();

//https://simon.lc/the-history-of-tetris-randomizers
function* tgm3Randomizer() {
  let pieces = ["I", "J", "L", "O", "S", "T", "Z"];
  let order = [];

  // Create 35 pool.
  let pool = pieces.concat(pieces, pieces, pieces, pieces);

  // First piece special conditions
  const firstPiece = ["I", "J", "L", "T"][Math.floor(Math.random() * 4)];
  yield firstPiece;

  let history = ["S", "Z", "S", firstPiece];

  while (true) {
    let roll;
    let i;
    let piece;

    // Roll For piece
    for (roll = 0; roll < 6; ++roll) {
      i = Math.floor(Math.random() * 35);
      piece = pool[i];
      if (history.includes(piece) === false || roll === 5) {
        break;
      }
      if (order.length) pool[i] = order[0];
    }

    // Update piece order
    if (order.includes(piece)) {
      order.splice(order.indexOf(piece), 1);
    }
    order.push(piece);

    pool[i] = order[0];

    // Update history
    history.shift();
    history[3] = piece;

    yield piece;
  }
}

export default Block;
