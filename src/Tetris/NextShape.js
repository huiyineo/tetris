import React from "react";
import Dot from "./Dot";

class NextShape extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: Array(8).fill(0),
    };
  }

  getShape(index) {
    const shapes = [
      [1, 1, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 1, 1, 0],
    ];

    if (index < 0 || index >= shapes.length) {
      return [0, 0, 0, 0, 0, 0, 0, 0];
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
    /*const smallBoard = (this.state.shape.map((value, index) => {
        return (
          <>
          
            <Dot key={index} isActivated={value === 0} />
          </>
        );
      }));*/

    return (
      <>
        <div className="next-shape-title">NEXT</div>

        <div>
          <Dot isActivated={this.state.shape[0] === 0} />
          <Dot isActivated={this.state.shape[1] === 0} />
          <Dot isActivated={this.state.shape[2] === 0} />
          <Dot isActivated={this.state.shape[3] === 0} />
        </div>
        <div>
          <Dot isActivated={this.state.shape[4] === 0} />
          <Dot isActivated={this.state.shape[5] === 0} />
          <Dot isActivated={this.state.shape[6] === 0} />
          <Dot isActivated={this.state.shape[7] === 0} />
        </div>

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
