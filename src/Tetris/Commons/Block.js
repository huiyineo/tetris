import utils from "../../Utils/utils";

const Block = {
  new: (index) => {
    const blocks = [
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
      ],
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
      [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
      ],
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
      ],
    ];

    if (index < 0 || index >= blocks.length) {
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }

    return blocks[index];
  },
  random: () => {
    //TODO: extra rule, same shape should not generate 3 times in a row
    const index = utils.random(0, 6);

    return Block.new(index);
  },
};

export default Block;
