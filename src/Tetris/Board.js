import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";
import utils from "../Utils/utils";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.boardRowCount = 20;
    this.boardColCount = 10;

    this.state = {
      board: this.initEmptyBoard(),
      block: Block.newSquare(this.props.movingBlock),
      blockX: -3,
      blockY: 4,
      blockNo: 1,
      intervalId: null,
      speed: 400,
      inDrop: false
    };
  }

  initEmptyBoard() {
    const dots = new Array(this.boardRowCount);
    for (var i = 0; i < dots.length; i++) {
      dots[i] = new Array(this.boardColCount).fill(0);
    }
    return dots;
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.moveBlock();
    }, this.state.speed);
    this.setState({ intervalId: intervalId });
  }

  createNewBlock() {
    this.props.requestNewBlock();

    this.setState({
      blockX: -3,
      blockY: 4,
      block: Block.newSquare(this.props.movingBlock),
    });
  }

  isFirstRowHaveDot() {
    return this.state.board[0].some((v) => v > 1);
  }

  pinCurrentBlock() {
    this.setState({
      blockNo: this.state.blockNo + 1
    });
    const newBoard = this.drawBlockInBoard(this.state.blockNo);
    this.setState({ board: newBoard });
  }

  getNextRowIndex() {
    return this.state.blockX + 1;
  }

  getPreviousRowIndex() {
    return this.state.blockX - 1;
  }

  getRepeatedRows(arr, repeats) {
    var func = (arr, repeats) => [
      ...Array.from({ length: repeats }, () => arr),
    ];
    return func(arr, repeats);
  }

  clearFilledRow() {
    const board = this.state.board;

    var filtered = board.filter((row) => !row.every((cell) => cell > 1));
    var newRows = this.getRepeatedRows(
      new Array(this.boardColCount).fill(0),
      board.length - filtered.length
    );

    this.setState({ board: newRows.concat(filtered) });
  }

  drawBlockInBoard(value) {
    const board = this.state.board;
    const block = this.state.block.content;
    const len = block.length;
    const x = this.state.blockX;
    const y = this.state.blockY;

    for (let i = len - 1; i >= 0; i--) {
      for (let j = 0; j < len; j++) {
        if (
          i + x >= 0 &&
          j + y >= 0 &&
          i + x < board.length &&
          block[i][j] === 1
        ) {
          board[i + x][j + y] = value;
        }
      }
    }

    return board;
  }

  hitNotMovingDot(moveX = 0, moveY = 0) {
    const board = this.state.board;
    const block = this.state.block.content;
    const len = block.length;
    const x = this.state.blockX + moveX;
    const y = this.state.blockY + moveY;

    for (let i = len - 1; i >= 0; i--) {
      for (let j = 0; j < len; j++) {
        if (
          i + x >= 0 &&
          j + y >= 0 &&
          i + x < board.length &&
          block[i][j] === 1 &&
          board[i + x][j + y] > 1
        ) {
          return true;
        }
      }
    }

    return false;
  }

  stillCanMoveDown(extraX = 0) {
    return (
      this.state.blockX + this.state.block.content.length + extraX <
      this.state.board.length
    );
  }

  moveBlock() {
    if (this.state.inDrop){
      return;
    }
    const isGameOver = this.isFirstRowHaveDot();
    if (isGameOver) {
      clearInterval(this.state.intervalId);
      return false;
    }

    if (!this.stillCanMoveDown() || this.hitNotMovingDot(1, 0)) {
      this.pinCurrentBlock();
      this.clearFilledRow();
      this.createNewBlock();
      return false;
    } 
    this.setState({ blockX: this.getNextRowIndex() });
    return true;
  }

  getSum(total, num) {
    return total + Math.round(num);
  }

  moveBlockY(i){
    if (this.state.inDrop){
      return;
    }
    const content = this.state.block.content;
    const movedY =this.state.blockY  + i;
    const getSum = (accumulator, currentValue) => accumulator + currentValue;

    const offset = Math.max.apply(null, content.map(function(row){ return row.reduce(getSum); }));
    const boundary = this.boardColCount - offset;
    if (movedY >= 0 && movedY <= boundary && !this.hitNotMovingDot(0, i)){
      this.setState({blockY : this.state.blockY + i});
    }
  }

  rotateBlock() {
    if (this.state.inDrop){
      return;
    }
    const block = this.state.block;

    if (block.name === "I" || block.name === "S" || block.name === "Z") {
      block.content = utils.rotateMatrixSpecial(block.content);
    } else {
      block.content = utils.rotateMatrix(block.content);
    }

    this.setState({ block: block });
  }

  checkIsActivated(value, rowIdx, colIdx) {
    if (value > 1) {
      return true;
    }

    const block = this.state.block.content;
    const len = block.length;

    const x = rowIdx - this.state.blockX;
    const y = colIdx - this.state.blockY;

    return x >= 0 && x < len && y >= 0 && x < len && block[x][y] === 1;
  }

  drop() {
    if (this.state.inDrop){
      return;
    }

    this.setState({ inDrop: true });

    let count = 0;
    while (this.stillCanMoveDown(count) && !this.hitNotMovingDot(count + 1, 0)) {
      count++;
    }

    this.setState({ 
      blockX: this.state.blockX + count,
      inDrop: false
    });
  }

  render() {
    const drawBoard = this.state.board.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            return (
              <Dot
                key={colIdx}
                isActivated={this.checkIsActivated(value, rowIdx, colIdx)}
                value={value}
              />
            );
          })}
        </div>
      );
    });

    return <>{drawBoard}</>;
  }
}

export default Board;
