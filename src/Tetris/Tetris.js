import React from "react";
import "./Tetris.css";
import NextShape from "./NextShape";

class Tetris extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="game-title">Welcome to Tetris.</div>
        <NextShape />
      </>
    );
  }
}

export default Tetris;
