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
      blockNo: 2,
      intervalId: null,
      speed: 400,
      inDrop: false,
      clearedLines: 0,
    };
  }

  initEmptyBoard() {
    return this.getRepeatedRows(this.boardRowCount);
  }

  componentDidMount() {
    this.setIntervalNormalMoveDown();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setIntervalNormalMoveDown() {
    const intervalId = setInterval(() => {
      this.moveBlock();
    }, this.state.speed);
    this.setState({ intervalId: intervalId });
  }

  createNewBlock() {
    const blockLetter = this.props.requestNewBlock();

    this.setState({
      blockX: -3,
      blockY: 4,
      block: Block.newSquare(blockLetter),
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

  getRepeatedRows(repeats) {
    const rows = new Array(repeats);
    for (var i = 0; i < repeats; i++) {
      rows[i] = new Array(this.boardColCount).fill(0);
    }
    return rows;
  }

  clearFilledRow() {
    const board = this.state.board;

    const filtered = board.filter((row) => !row.every((cell) => cell >= 1));
    const newRows = this.getRepeatedRows(board.length - filtered.length);

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
    const lenX = block.length;
    const lenY = block[0].length;
    const x = this.state.blockX;
    const y = this.state.blockY;

    for (let i = lenX - 1; i >= 0; i--) {
      for (let j = 0; j < lenY; j++) {
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
    const lenX = block.length;
    const lenY = block[0].length;
    const x = this.state.blockX + moveX;
    const y = this.state.blockY + moveY;

    for (let i = lenX - 1; i >= 0; i--) {
      for (let j = 0; j < lenY; j++) {
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
    const lenX = block.length;
    const lenY = block[0].length;

    for (let i = lenX - 1; i > 0; i--) {
      for (let j = 0; j < lenY; j++) {
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

  shiftLeftRight(i) {
    if (this.state.inDrop) {
      return false;
    }
    const content = this.state.block.content;
    const finalY = this.state.blockY + i;

    if (
      this.ableToShiftLeftRight(finalY, content) &&
      !this.hitNotMovingDot(0, i)
    ) {
      this.setState({ blockY: finalY });
      return true;
    }

    return false;
  }

  ableToShiftLeftRight(blockY, content) {
    //[[0,0,0],[0,1,1],[1,1,0]] => [1,1,1]
    let sumsOfBlock = this.getLengthArray(content);
    var rightEdge =
      blockY + sumsOfBlock.lastIndexOf(1);
    return blockY >= 0 && rightEdge < this.boardColCount;
  }

  getExtraBlockToWallKick(blockY, newBlock) {
    //[[0,0,0],[0,1,1],[1,1,0]] => [1,1,1]
    let newBlockLengthArray = this.getLengthArray(newBlock);
    var rightEdgeIndex = blockY + newBlockLengthArray.lastIndexOf(1);
    return this.boardColCount - 1 - rightEdgeIndex < 0
      ? this.boardColCount - 1 - rightEdgeIndex
      : 0;
  }

  getLengthArray(block){
    return block[0]
    .map((x, idx) => block.reduce((sum, curr) => sum + curr[idx], 0))
    .map((x) => (x > 0 ? 1 : 0));
  }

  printBlock() {
    utils.printBlock(this.state.block);
  }

  rotateBlock() {
    if (this.state.inDrop) {
      return;
    }    
    const block = utils.rotateBlock(this.state.block);
    if (this.state.blockX + block.transformX < 0){
      return;
    }
    //need to wall kick both left/right
    //Only need to kick and kick success then set rotate
    let right = 0;
    if (
      this.state.blockY >= 0 &&
      this.state.blockY < this.state.board[0].length
    ) {
        right = this.getExtraBlockToWallKick(
        this.state.blockY + block.transformY,
        block.content
      );
    }
    //Set rotate
    this.setState({
      block: block,
      blockX: this.state.blockX + block.transformX,
      blockY: Math.max(this.state.blockY + block.transformY + right, 0),
    });
  }

  checkIsActivated(value, rowIdx, colIdx) {
    if (value >= 1) {
      return true;
    }

    const block = this.state.block.content;
    const lenX = block.length;

    const x = rowIdx - this.state.blockX;
    const y = colIdx - this.state.blockY;

    return x >= 0 && x < lenX && y >= 0 && block[x][y] === 1;
  }

  checkIsInBlock(value, rowIdx, colIdx) {
    if (value >= 1) {
      return false;
    }

    const block = this.state.block.content;
    const lenX = block.length;
    const lenY = block[0].length;

    const x = rowIdx - this.state.blockX;
    const y = colIdx - this.state.blockY;

    return x >= 0 && x < lenX && y >= 0 && y < lenY;
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
    const current = this.state.block.name;
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    this.mouseUpForDownButton = false;
    let accelerate = this.state.speed;
    let lineCount = 0;
    while (
      this.moveBlock() &&
      current === this.state.block.name &&
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
    this.setIntervalNormalMoveDown();
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
                isInBlock={this.checkIsInBlock(value, rowIdx, colIdx)}
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
