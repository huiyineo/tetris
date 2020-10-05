import React from "react";
import Dot from "./Commons/Dot";
import utils from "../Utils/utils";
import Block from "./Commons/Block";

class RotateBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: this.generateMatrixWithBlock(Block.tgm3Random()),
    };
  }

  generateMatrixWithBlock(block) {
    const len = block.content[0].length;

    block.content = utils.blockToMatrix(block.content, len, len);

    return block;
  }

  rotateBlock() {
    const current = this.state.block;

    if (current.name !== "O") {
      current.content = utils.rotateMatrix(current.content);
    }

    return current;
  }

  render() {
    const smallBoard = this.state.block.content.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => (
            <Dot key={colIdx} isActivated={value === 0} />
          ))}
        </div>
      );
    });

    return (
      <>
        <div className="section-title">Rotate</div>

        {smallBoard}

        <div className="button-space">
          <button
            onClick={() => {
              this.setState({ block: this.rotateBlock() });
            }}
          >
            Rotate block
          </button>
        </div>
      </>
    );
  }
}

export default RotateBlock;
