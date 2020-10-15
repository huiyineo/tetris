import React from "react";
import "./Tetris.css";
import NextBlock from "./NextBlock";
import RotateBlock from "./RotateBlock";
import Board from "./Board";
import Board2 from "./Board2";
import Control from "./Control";
import Block from "./Commons/Block";
import SmallBoard from "./Commons/SmallBoard";

class Tetris extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBlock: Block.tgm3Random(),
      nextBlock: Block.tgm3Random(),
    };

    this.newBlockHandler = this.newBlockHandler.bind(this);
  }

  newBlockHandler() {
    const block = this.state.nextBlock;

    this.setState({ currentBlock: block, nextBlock: Block.tgm3Random() });

    return block;
  }

  render() {
    return (
      <>
        <div className="game-title">Yotta Tetris</div>

        <div className="game-content">
          <div className="main-board">
            <Board
              movingBlock={this.state.currentBlock}
              requestNewBlock={this.newBlockHandler}
            />
          </div>
          <div className="next-board">
            <SmallBoard blockName={this.state.nextBlock} />
          </div>
          <div className="game-control">
            <Control />
          </div>
        </div>

        <NextBlock />
        <br />
        <RotateBlock />
        <br />
        <Board2 />
      </>
    );
  }
}

export default Tetris;
