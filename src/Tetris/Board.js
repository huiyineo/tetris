import React from "react";
import Dot from "./Commons/Dot";

class Board extends React.Component {
  constructor(props) {
    super(props);

    var dots = new Array(20);
    for (var i = 0; i < dots.length; i++) {
      dots[i] = new Array(10).fill(0);
    }

    this.state = {
      dots: dots,
      movingBlock: null,
      gameOver: false      
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.moveBlock();
    }, 500);
  }

  moveBlock() {
    if (this.state.gameOver) {
      return;
    }

    if (this.state.movingBlock == null) {
      this.setState({
        movingBlock: this.getNewBlock(),
      });
      return;
    }

    let movingBlock = this.state.movingBlock.map((x) => {
      x += 10;
      return x;
    });

    let dots = this.state.dots;
    let gameOver = this.state.gameOver;
    if (this.shouldStop(movingBlock)) {
      this.state.movingBlock.forEach(
        (x) => (dots[Math.floor(x / 10)][x % 10] = 1)
      );
      const newBlock = this.getNewBlock();

      if (this.shouldStop(newBlock)) {
        gameOver = true;
      } else {
        movingBlock = newBlock;
      }
    }

    this.setState({
      dots: dots,
      movingBlock: movingBlock,
      gameOver: gameOver,
    });
  }

  shouldStop(movingBlock) {
    return (
      movingBlock.some((x) => x >= 200) ||
      movingBlock.some((x) => this.state.dots[Math.floor(x / 10)][x % 10] === 1)
    );
  }

  getNewBlock() {
    return [2, 3, 12, 13];
  }

  render() {
    const board = this.state.dots.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            let isActivated =
              this.state.movingBlock != null &&
              this.state.movingBlock.includes(rowIdx * 10 + colIdx)
                ? value === 0
                : 0;
            return <Dot key={colIdx} isActivated={isActivated} />;
          })}
        </div>
      );
    });

    const status = this.state.gameOver ? "Game Over" : "Running";
    return (
      <div>
        <div>{status}</div>
        <div>{board}</div>
      </div>
    );
  }
}

export default Board;
