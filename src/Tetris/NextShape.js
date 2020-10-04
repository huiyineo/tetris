import React from "react";
import Dot from "./Dot";

class NextShape extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: Array(2).fill(Array(4).fill(0)),
    };
  }

  getShape(index) {
    const shapes = [
      [[1, 1, 0, 0],[ 0, 1, 1, 0]],
      [[0, 1, 1, 0],[ 1, 1, 0, 0]],
      [[0, 1, 0, 0],[ 1, 1, 1, 0]],
      [[1, 1, 0, 0],[ 1, 1, 0, 0]],
      [[1, 1, 1, 1],[ 0, 0, 0, 0]],
      [[1, 0, 0, 0],[ 1, 1, 1, 0]],
      [[0, 0, 1, 0],[ 1, 1, 1, 0]],
    ];

    if (index < 0 || index >= shapes.length) {
      return [[0, 0, 0, 0], [0, 0, 0, 0]];
    }

    return shapes[index];
  }

  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  randomNewShape() {
    //TODO: extra rule, same shape should not generate 3 times in a row
    return this.getShape(this.random(0, 6));
  }

  render() {
    const smallBoard = this.state.shape.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            return <Dot key={colIdx} isActivated={value === 0} />;
          })}
        </div>
      );
    });

    return (
      <>
        <div className="next-shape-title">NEXT</div>

       {smallBoard}

        <div className="button-space">
          <button
            onClick={() => {
              this.setState({ shape: this.randomNewShape() });
            }}
          >
            Random shape
          </button>
        </div>
      </>
    );
  }
}

export default NextShape;
