import React from "react";
import Dot from "./Commons/Dot";
import utils from "../Utils/utils";
import Block from "./Commons/Block";

class RotateBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: this.generateMatrixWithBlock(4, Block.tgm3Random()),
    };
  }

  //Kaythi, I just try try, not work correctly, you continue w this
  //TODO: work wrongly, not correct position
  generateMatrixWithBlock(size, block) {
    const matrix = [];
    const blockRow = block.length;
    const blockCol = block[0].length;

    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        if (i < blockRow && j < blockCol) {
          matrix[i][j] = block[i][j];
        } else {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  }

  //Kaythi, I just try try, not work correctly, you continue w this
  //TODO: rotate for whole matrix is not correct algorithm
  rotateBlock() {
    const current = this.state.block;

    return utils.rotateMatrix(current);
  }

  render() {
    const smallBoard = this.state.block.map((row, rowIdx) => {
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
