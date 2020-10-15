import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";
import utils from "../Utils/utils";

class Board extends React.Component {
  constructor(props) {
    super(props);

    var dots = new Array(20);
    for (var i = 0; i < dots.length; i++) {
      dots[i] = new Array(10).fill(0);
      // if(i === 19){
      //   dots[i] = [2,2,2,2,0,0,2,2,2,2]
      // }
    }

    this.state = {
      board: dots,
      block: this.generateMatrixWithBlock(Block.simpleRandom()),
      position: [-3, 4],
      blockNo: 1,
      intervalId: null
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.moveBlock();
    }, 500);
    this.setState({intervalId: intervalId});
  }

  generateMatrixWithBlock(block) {
    const len = Math.max(block.content.length, block.content[0].length);

    block.content = utils.blockToMatrix(block.content, len, len);

    return block;
  }

  createNewBlock() {
    this.setState({
      position: [-3, 4],
      block: this.generateMatrixWithBlock(Block.tgm3RandomNew()),
    });
  }

  isGameOver() {
    const board = this.state.board;
    const len = board[0].length;
    for (let i = 0; i < len; i++) {
      if (board[0][i] > 1) {
        return true;
      }
    }

    return false;
  }

  pinCurrentBlock() {
    this.setState({ blockNo: this.state.blockNo + 1 });
    return this.drawBlockInBoard(this.state.blockNo);
  }

  getNextPosition() {
    if (this.state.position[0] + 1 === this.state.board.length) {
      return this.state.position;
    }
    return [this.state.position[0] + 1, this.state.position[1]];
  }

  getPreviousPosition() {
    if (this.state.position[0] - 1 < 0) {
      return this.state.position;
    }
    return [this.state.position[0] - 1, this.state.position[1]];
  }

  getRepeatedRows(arr, repeats) {
    var func = (arr, repeats) =>[...Array.from({ length: repeats }, () => arr)];
    return func(arr, repeats);
  }

  clearFilledRow(){
    const board = this.state.board;
    var filtered = board.filter((row) => !row.every(cell => cell > 1))
    var newRows = this.getRepeatedRows(new Array(10).fill(0), board.length - filtered.length);
    filtered =  newRows.concat(filtered)
    this.setState({board: filtered});
  }

  drawMovingBlock() {
    return this.drawBlockInBoard(1);
  }

  drawBlockInBoard(value) {
    const board = this.state.board;
    const block = this.state.block.content;

    const len = block.length;
    const x = this.state.position[0];
    const y = this.state.position[1];

    for (let i = len - 1; i >= 0; i--) {
      for (let j = 0; j < len; j++) {
        //Clear old block
        if (i + x - 1 >= 0 && board[i + x - 1][j + y] === 1) {
          board[i + x - 1][j + y] = 0;
        }
        //Draw new block
        if (i + x >= 0 && i + x < board.length && block[i][j] === 1) {
          board[i + x][j + y] = value;
        }
      }
    }

    return board;
  }

  hitNotMovingDot() {
    const board = this.state.board;
    const block = this.state.block.content;
    const len = block.length;
    const x = this.state.position[0];
    const y = this.state.position[1];
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 0; j < len; j++) {
          
          if (i + x >= 0 && i + x < board.length && block[i][j] === 1 && board[i + x][j + y] > 1 ) {
            return true;
          }
        }
      }
    
    return false;
  }

  moveBlock() {
    if (this.isGameOver()) {
      clearInterval(this.state.intervalId);
      return;
    }

    let newBoard = this.state.block;
    const isHitTheGround =
      this.state.position[0] + this.state.block.content.length >
      this.state.board.length;
     
    if (isHitTheGround || this.hitNotMovingDot()) {
      this.setState({ position: this.getPreviousPosition() });
      newBoard = this.pinCurrentBlock();
      this.setState({ board: newBoard });
      this.createNewBlock();
      this.clearFilledRow();
    } else {
      newBoard = this.drawMovingBlock();
      this.setState({ board: newBoard, position: this.getNextPosition() });
    }
  }

  render() {
    const drawBoard = this.state.board.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            return <Dot key={colIdx} isActivated={value !== 0} value={value} />;
          })}
        </div>
      );
    });

    return (
      <>        
        {drawBoard}
      </>
    );
  }
}

export default Board;
