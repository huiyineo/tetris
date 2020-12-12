import React from "react";
import Dot from "./Commons/Dot";
import utils from "../Utils/utils";
import Block from "./Commons/Block";

class RotateBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        { block: Block.newSquare("I"), x: 0, y: 1 },
        { block: Block.newSquare("J"), x: 0, y: 0 },
        { block: Block.newSquare("L"), x: 0, y: 0 },
        { block: Block.newSquare("O"), x: 0, y: 0 },
        { block: Block.newSquare("S"), x: 0, y: 0 },
        { block: Block.newSquare("T"), x: 0, y: 0 },
        { block: Block.newSquare("Z"), x: 0, y: 0 },
      ],
    };
  }

  rotateBlocks(blocks) {
    blocks.forEach((blockObj) => {
      blockObj.block = utils.rotateBlock(blockObj.block);
      blockObj.x = blockObj.x + blockObj.block.transformX;
      blockObj.y = blockObj.y + blockObj.block.transformY;
    });

    return blocks;
  }

  render() {
    const smallBoard = this.state.blocks.map((blockObj, blockIdx) => {
      return (
        <div key={blockIdx} className="rotate-block">
          {utils.putBlockInSquare(blockObj.block, blockObj.x, blockObj.y).map((row, rowIdx) => (
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
