import React from "react";
import "./Tetris.css";
import NextBlock from "./NextBlock";
import RotateBlock from "./RotateBlock";
import Board from "./Board";
import Board2 from "./Board2";
import Control from "./Control";
import Block from "./Commons/Block";
import SmallBoard from "./Commons/SmallBoard";
import Decorate from "./Decorate";

class Tetris extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBlock: Block.newTgm3Random(),
      nextBlock: Block.tgm3Random(),
    };

    //To bind event from child
    this.newBlockHandler = this.newBlockHandler.bind(this);
    this.rotateBlockHandler = this.rotateBlockHandler.bind(this);

    //To create Refs with child
    this.board = React.createRef();
  }

  newBlockHandler() {
    const block = this.state.nextBlock;

    this.setState({ currentBlock: block, nextBlock: Block.tgm3Random() });

    return block;
  }

  rotateBlockHandler() {    
    this.board.current.rotateBlock();
  }

  moveBlockHandler(i){
    this.board.current.moveBlockY(i);
  }  

  render() {
    return (
      <>
        <div className="game-title">Yotta Tetris</div>
        <div className="game-content">
          <div className="game-decoration">
            <Decorate />
          </div>
          <div className="game-main">
            <div className="game-board">
              <Board
                ref={this.board}
                movingBlock={this.state.currentBlock}
                requestNewBlock={this.newBlockHandler}
              />
            </div>
            <div className="game-information">
              <div className="section-title">Score</div>
              <div className="section-content">0</div>
              <div className="section-title">Level</div>
              <div className="section-content">0</div>
              <div className="section-title">Next</div>
              <div className="section-content">
                <SmallBoard blockName={this.state.nextBlock} />
              </div>
              <div className="section-title">Status</div>
              <div className="section-content">work in progress</div>
            </div>
            <div className="game-control">
              <Control
                resetGame={this.props.resetGame}
                rotateBlock={this.rotateBlockHandler}
                moveLeft={() => this.moveBlockHandler(-1)}
                moveRight={() => this.moveBlockHandler(1)}
              />
            </div>
          </div>
        </div>
        <div className="game-history">
          <div className="section-title">History Scores</div>
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
