import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";
import Score from "./Commons/Score";
import utils from "../Utils/utils";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.boardRowCount = 20;
    this.boardColCount = 10;

    this.mouseUpForDownButton = true;
    this.state = {
      board: this.initEmptyBoard(),
      block: Block.newSquare(this.props.movingBlock),
      blockX: -3,
      blockY: 4,
      blockNo: 1,
      intervalId: null,
      speed: 400,
      inDrop: false,
      clearedLines: 0,
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

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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
    const newBoard = this.drawBlockInBoard(this.state.blockNo);
        this.setState({
      blockNo: this.state.blockNo + 1,
    });
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

    const filtered = board.filter((row) => !row.every((cell) => cell > 1));
    const newRows = this.getRepeatedRows(
      new Array(this.boardColCount).fill(0),
      board.length - filtered.length
    );

    const filledRowCount = this.boardRowCount - filtered.length;
    this.props.updateScores(this.calculateScores(filledRowCount));

    this.setState({ board: newRows.concat(filtered) });
  }

  calculateScores(line) {
    const cleared = this.state.clearedLines + line;
    //Try fixed level first with 10 rows first
    const level = parseInt(cleared / 10);

    this.setState({ clearedLines: cleared });
    return Score.linePoints(level, line);
  }

  drawBlockInBoard(value) {
    const board = this.state.board;
    const block = this.state.block.content;
    const len = block.length;
    const x = this.state.blockX;
    const y = this.state.blockY - this.getYOffset(block);

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

  getYOffset(block){ //find the leftmost block
    return block[0]
      .map((x, idx) => block.reduce((sum, curr) => sum + curr[idx], 0))
      .map((x) => (x > 0 ? 1 : 0)).indexOf(1);
  }

  hitNotMovingDot(moveX = 0, moveY = 0) {
    const board = this.state.board;
    const block = this.state.block.content;
    const len = block.length;
    const x = this.state.blockX + moveX;
    const y = this.state.blockY + moveY - this.getYOffset(block);

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
    const block = this.state.block.content;
    const rowHasDot = this.getLastRowHasDot(block);
    return this.state.blockX + rowHasDot + extraX < this.state.board.length;
  }

  getLastRowHasDot(block) {
    const length = block.length;
    for (let i = length - 1; i > 0; i--) {
      for (let j = 0; j < length; j++) {
        if (block[i][j] > 0) { 
          return i + 1;
        }
      }
    }

    return 1;
  }


  moveBlock() {
    if (this.state.inDrop) {
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
    }
    this.setState({ blockX: this.getNextRowIndex() });
    return true;
  }

  getSum(total, num) {
    return total + Math.round(num);
  }

  moveBlockY(i) {
    if (this.state.inDrop) {
      return;
    }
    const content = this.state.block.content;
    const finalY = this.state.blockY + i;
    if (this.AbleToMoveY(finalY, content) && !this.hitNotMovingDot(0, i)) {
      this.setState({ blockY: finalY });
    }
  }

  AbleToMoveY(blockY, content) {
    //[[0,0,0],[0,1,1],[1,1,0]] => [1,1,1]
    let sumsOfBlock = content[0]
      .map((x, idx) => content.reduce((sum, curr) => sum + curr[idx], 0))
      .map((x) => (x > 0 ? 1 : 0));
    var rightEdge = blockY + sumsOfBlock.lastIndexOf(1) - sumsOfBlock.indexOf(1);
    return blockY >= 0 && rightEdge < this.boardColCount;
  }

  rotateBlock() {
    if (this.state.inDrop) {
      return;
    }
    const block = this.state.block;
    var rotatedBlock;
    if (block.name === "I" || block.name === "S" || block.name === "Z") {
      rotatedBlock = utils.rotateMatrixSpecial(block.content);
    } else {
      rotatedBlock = utils.rotateMatrix(block.content);
    }

    if (this.AbleToMoveY(this.state.blockY, rotatedBlock)) {
      block.content = rotatedBlock;
      this.setState({ block: block });
    }
  }

  checkIsActivated(value, rowIdx, colIdx) {
    if (value >= 1) {
      return true;
    }

    const block = this.state.block.content;
    const len = block.length;

    const x = rowIdx - this.state.blockX;
    const y = colIdx - this.state.blockY + this.getYOffset(block);

    return x >= 0 && x < len && y >= 0 && block[x][y] === 1;
  }

  drop() {
    if (this.state.inDrop) {
      return;
    }

    this.setState({ inDrop: true });

    let count = 0;
    while (
      this.stillCanMoveDown(count) &&
      !this.hitNotMovingDot(count + 1, 0)
    ) {
      count++;
    }
    
    this.props.updateScores(Score.droppedPoints(count, 2));

    this.setState({
      blockX: this.state.blockX + count,
      inDrop: false,
    });
  }

  async repeat() {
    const current = this.props.movingBlock;
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    this.mouseUpForDownButton = false;
    let accelerate = this.state.speed;
    let lineCount = 0;
    while (
      this.moveBlock() &&
      current === this.props.movingBlock &&
      !this.mouseUpForDownButton
    ) {
      accelerate = accelerate / 5;
      lineCount++;
      await sleep(accelerate);
    }

    return lineCount;
  }

  async down() {
    clearInterval(this.state.intervalId);

    const line = await this.repeat();
    this.props.updateScores(Score.droppedPoints(line, 1));
  }

  mouseUp() {
    this.mouseUpForDownButton = true;
    let id = setInterval(() => {
      this.moveBlock();
    }, this.state.speed);
    this.setState({ intervalId: id });
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
