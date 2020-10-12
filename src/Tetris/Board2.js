import React from "react";
import Dot from "./Commons/Dot";

class Board2 extends React.Component {
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
        (x) => {
          if (x >= 0) {
            dots[Math.floor(x / 10)][x % 10] = 1
          }
        }
      );
      const newBlock = this.getNewBlock();

      if (this.shouldStop(newBlock)) {
        gameOver = true;
        this.setState ({
          gameOver: gameOver,
        });
        return;
      } else {
        movingBlock = newBlock;
      }
    }

    this.setState({
      dots: dots,
      movingBlock: movingBlock
    });
  }

  shouldStop(movingBlock) {
    return (
      movingBlock.some((x) => x >= 200) ||
      movingBlock.some((x) => x >= 0 && this.state.dots[Math.floor(x / 10)][x % 10] === 1)
    );
  }

  getNewBlock() {
    //return [-8, -7, 2, 3];
    return [-17, -7, 2, 3];
  }

  render() {
    const board = this.state.dots.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            let isActivated =
              this.state.movingBlock != null &&
              this.state.movingBlock.includes(rowIdx * 10 + colIdx)
                ? 1
                : value === 1;
            return <Dot key={colIdx} isActivated={isActivated} />;
          })}
        </div>
      );
    });

    const status = this.state.gameOver ? "Game Over" : "Welcome";
    return (
      <div>
        <div>{status}</div>
        <div>{board}</div>
      </div>
    );
  }
}

export default Board2;
