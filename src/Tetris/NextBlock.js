import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";
import utils from "../Utils/utils";

class NextBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: Array(2).fill(Array(4).fill(0)),
    };
  }

  render() {
    const smallBoard = this.state.block.map((row, rowIdx) => {
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
              this.setState({
                block: utils.blockToMatrix(Block.tgm3Random().content, 2, 4),
              });
            }}
          >
            Random block
          </button>
        </div>
      </>
    );
  }
}

export default NextBlock;
