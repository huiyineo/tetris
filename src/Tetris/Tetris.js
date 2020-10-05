import React from "react";
import "./Tetris.css";

import NextShape from "./NextShape";
import RotateShape from "./RotateShape";

class Tetris extends React.Component {
  render() {
    return (
      <>
        <div className="game-title">Welcome to Tetris.</div>
        <NextShape />
        <RotateShape />
      </>
    );
  }
}

export default Tetris;
