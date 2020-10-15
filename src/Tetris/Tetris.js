import React from "react";
import "./Tetris.css";
import NextBlock from "./NextBlock";
import RotateBlock from "./RotateBlock";
import Board from "./Board";
import Board2 from "./Board2";
import Control from "./Control";

class Tetris extends React.Component {
  render() {
    return (
      <>
        <div className="game-title">Welcome to Tetris.</div>

        <div className="game-content">
          <div className="main-board">
            <Board />
          </div>
          <div className="next-board">
            <NextBlock />
          </div>
          <div className="game-control">
            <Control />
          </div>
        </div>

        <RotateBlock />
        <br />
        <Board2 />
      </>
    );
  }
}

export default Tetris;
