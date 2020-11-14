import React from "react";
import "./Tetris.css";
import NextBlock from "./NextBlock";
import RotateBlock from "./RotateBlock";
import Board from "./Board";
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
    this.drop = this.drop.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.down = this.down.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

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

  drop(){
    this.board.current.drop();
  }

  down(){
    this.board.current.down();
  }

  mouseUp(){
    this.board.current.mouseUp();
  }
  handleKeyDown = (e) => {
    e.preventDefault();
    switch(e.keyCode) {
      case 32:
        this.drop();
        break;
      case 37:
        this.moveBlockHandler(-1);
        break;
      case 38:
        this.rotateBlockHandler();
        break;
      case 39:
        this.moveBlockHandler(1);
        break;
      case 40:
        //todo
        break;
      default:
        break;
    }
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown, false);
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
                drop={this.drop}
                down={this.down}
                mouseUp={this.mouseUp}
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
      </>
    );
  }
}

export default Tetris;
