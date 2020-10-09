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
        <Board />
        <Board2 />
        <Control />
        <NextBlock />
        <RotateBlock />        
      </>
    );
  }
}

export default Tetris;
