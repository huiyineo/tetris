import utils from "../../Utils/utils";

const Shape = {
  new: (index) => {
    const shapes = [
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

    if (index < 0 || index >= shapes.length) {
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }

    return shapes[index];
  },
  random: () => {
    //TODO: extra rule, same shape should not generate 3 times in a row
    const index = utils.random(0, 6);

    return Shape.new(index);
  },
};

export default Shape;
