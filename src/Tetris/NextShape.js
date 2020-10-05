import React from "react";
import Dot from "./Dot";
import Shape from "./Commons/Shape";

class NextShape extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shape: Array(2).fill(Array(4).fill(0)),
    };
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
        <div className="section-title">Next</div>

        {smallBoard}

        <div className="button-space">
          <button
            onClick={() => {
              this.setState({ shape: Shape.random() });
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
