import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";
import utils from "../Utils/utils";

class Board2 extends React.Component {
  constructor(props) {
    super(props);

    var dots = new Array(20);
    for (var i = 0; i < dots.length; i++) {
      dots[i] = new Array(10).fill(0);
    }

    this.state = {
      board: dots,
      block: this.generateMatrixWithBlock(Block.simpleRandom()),
      position: [-3, 4],
    };

    this.moveBlock();
  }

  componentDidMount() {
    setInterval(() => {
      this.moveBlock();
    }, 500);
  }

  generateMatrixWithBlock(block) {
    const len = Math.max(block.content.length, block.content[0].length);

    block.content = utils.blockToMatrix(block.content, len, len);

    return block;
  }

  getNewBlock() {
    this.setState({
      block: this.generateMatrixWithBlock(Block.simpleRandom()),
      position: [0, 4],
    });
  }

  moveBlock() {
    const board = this.state.board;
    const block = this.state.block.content;

    const len = this.state.block.content.length;
    const x = this.state.position[0];
    const y = this.state.position[1];

    if (x + len > board.length /*&& hit not moving dot*/) {
      this.getNewBlock();
      return;
    }

    for (let i = len - 1; i >= 0; i--) {
      for (let j = 0; j < len; j++) {
        //Clear old moving dot
        if (i + x - 1 >= 0 && board[i + x - 1][j + y] === 1) {
          board[i + x - 1][j + y] = 0;
        }
        //Add new moving dot
        if (i + x >= 0 && i + x < board.length) {
          board[i + x][j + y] = block[i][j];
        }
      }
    }

    this.setState({ board: board, position: [x + 1, y] });
  }

  render() {
    const drawBoard = this.state.board.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            return <Dot key={colIdx} isActivated={value !== 0} />;
          })}
        </div>
      );
    });

    return (
      <>
        <div className="section-title">Next</div>

        {drawBoard}
      </>
    );
  }
}

export default Board2;
