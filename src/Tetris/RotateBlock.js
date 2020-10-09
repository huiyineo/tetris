import React from "react";
import Dot from "./Commons/Dot";
import utils from "../Utils/utils";
import Block from "./Commons/Block";

class RotateBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      block: this.generateMatrixWithBlock(Block.tgm3RandomNext()),
      blocks: [
        this.generateMatrixWithBlock(Block.new("I")),
        this.generateMatrixWithBlock(Block.new("J")),
        this.generateMatrixWithBlock(Block.new("L")),
        this.generateMatrixWithBlock(Block.new("O")),
        this.generateMatrixWithBlock(Block.new("S")),
        this.generateMatrixWithBlock(Block.new("T")),
        this.generateMatrixWithBlock(Block.new("Z")),
      ],
    };
  }

  generateMatrixWithBlock(block) {
    const len = Math.max(block.content.length, block.content[0].length);

    block.content = utils.blockToMatrix(block.content, len, len);

    return block;
  }

  rotateBlocks(blocks) {
    blocks.forEach((block) => {
      block.content = utils.rotateMatrix(block.content);
    });

    return blocks;
  }

  render() {
    /*const smallBoard = this.state.block.content.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => (
            <Dot key={colIdx} isActivated={value === 0} />
          ))}
        </div>
      );
    });*/
    const smallBoard = this.state.blocks.map((block, blockIdx) => {
      return (
        <div key={blockIdx}>
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
