import utils from "../../Utils/utils";

const Block = {
  pieces: ["I", "J", "L", "O", "S", "T", "Z"],
  new: (letter) => {
    let blocks = {
      I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      J: [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
      ],
      L: [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
      ],
      O: [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
      ],
      S: [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
      ],
      T: [
        [1, 1, 1, 0],
        [0, 1, 0, 0],
      ],
      Z: [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
      ],
    };
    return blocks[letter];
  },

  simpleRandom: () => {
    return Block.new(utils.randomFromArray(Block.pieces));
  },

  tgm3Random: () => {
    /*const random = tgm3Randomizer();
    const obj = random.next();
    console.log(obj);*/
    return Block.new(tgm3Randomizer().next().value);
  },
};

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
