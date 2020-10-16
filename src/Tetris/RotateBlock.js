import React from "react";
import Dot from "./Commons/Dot";
import utils from "../Utils/utils";
import Block from "./Commons/Block";

class RotateBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        Block.newSquare("I"),
        Block.newSquare("J"),
        Block.newSquare("L"),
        Block.newSquare("O"),
        Block.newSquare("S"),
        Block.newSquare("T"),
        Block.newSquare("Z"),
      ],
    };
  }

  rotateBlocks(blocks) {
    blocks.forEach((block) => {
      if (block.name === "I" || block.name === "S" || block.name === "Z") {
        block.content = utils.rotateMatrixSpecial(block.content);
      } else {
        block.content = utils.rotateMatrix(block.content);
      }
    });

    return blocks;
  }

  render() {
    const smallBoard = this.state.blocks.map((block, blockIdx) => {
      return (
        <div key={blockIdx} className="rotate-block">
          {block.content.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((value, colIdx) => (
                <Dot key={colIdx} isActivated={value !== 0} />
              ))}
            </div>
          ))}
          <br />
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
              this.setState({ block: this.rotateBlocks(this.state.blocks) });
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
