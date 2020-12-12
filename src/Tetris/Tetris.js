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
      currentBlockLetter: Block.newTgm3Random(),
      nextBlockLetter: Block.tgm3Random(),
      scores: 0,
      level: 0,
    };

    //To bind event from child
    this.newBlockHandler = this.newBlockHandler.bind(this);
    this.rotateBlockHandler = this.rotateBlockHandler.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.drop = this.drop.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.down = this.down.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    //To create Refs with child
    this.board = React.createRef();
  }

  newBlockHandler() {
    const block = this.state.nextBlockLetter;

    this.setState({
      currentBlockLetter: block,
      nextBlockLetter: Block.tgm3Random(),
    });

    return block;
  }

  rotateBlockHandler() {
    this.board.current.rotateBlock();
  }

  moveBlockHandler(i) {
    this.board.current.shiftLeftRight(i);
  }

  drop() {
    this.board.current.drop();
  }

  async down() {
    await this.board.current.down();
  }

  mouseUp() {
    if (this.board.current) {
      this.board.current.mouseUp();
    } else {
      console.log("How come board is NULL here");
    }
  }

  handleKeyDown = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 32: //Space
        this.drop(); // can rename to hard drop
        break;
      case 37: //Left arrow
        this.moveBlockHandler(-1);
        break;
      case 38: //Up arrow
        this.rotateBlockHandler();
        break;
      case 39: //Right arrow
        this.moveBlockHandler(1);
        break;
      case 40: //Down arrow
        //Soft drop
        this.down();
        break;
      case 80: //P
      case 112: //p
        //Pause play
        break;
      case 82: //R
      case 114: //r
        this.props.resetGame();
        break;
      default:
        break;
    }
  };

  handleKeyUp = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 40:
        this.mouseUp();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  updateScores(scores) {
    this.setState({ scores: this.state.scores + scores });
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
                movingBlock={this.state.currentBlockLetter}
                requestNewBlock={this.newBlockHandler}
                updateScores={this.updateScores}
              />
            </div>
            <div className="game-information">
              <div className="section-title">Score</div>
              <div className="section-content">{this.state.scores}</div>
              <div className="section-title">Level</div>
              <div className="section-content">{this.state.level}</div>
              <div className="section-title">Next</div>
              <div className="section-content">
                <SmallBoard blockName={this.state.nextBlockLetter} />
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
          <div className="section-title">
            History Scores (highest scores: 999999)
          </div>
          <table>
            <thead>
              <tr>
                <th className="w200">Time</th>
                <th className="w150">Level</th>
                <th className="w150">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00:45:50</td>
                <td className="right-text">10</td>
                <td className="right-text">999999</td>
              </tr>
            </tbody>
          </table>
        </div>

        <NextBlock />
        <br />
        <RotateBlock />
      </>
    );
  }
}

export default Tetris;
