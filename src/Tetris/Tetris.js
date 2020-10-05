import React from "react";
import "./Tetris.css";

import NextBlock from "./NextBlock";
import RotateBlock from "./RotateBlock";

class Tetris extends React.Component {
  render() {
    return (
      <>
        <div className="game-title">Welcome to Tetris.</div>
        <NextBlock />
        <RotateBlock />
      </>
    );
  }
}

export default Tetris;
