import React from "react";

class Control extends React.Component {
  render() {
    return (
      <>
        <button onClick={this.props.moveLeft}>Left</button>
        <button onClick={this.props.moveRight}>Right</button>
        <button onClick={this.props.rotateBlock}>Rotate</button>
        <button onClick={() => {}}>Down</button>
        <button onClick={() => {}}>Drop</button>
        <br/>
        <button onClick={() => {}}>Play Pause</button>
        <button onClick={this.props.resetGame}>Reset</button>
      </>
    );
  }
}

export default Control;
