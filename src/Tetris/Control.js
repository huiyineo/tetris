import React from "react";

class Control extends React.Component {
  render() {
    return (
      <>
        <button onClick={this.props.moveLeft}>Left (&larr;)</button>
        <button onClick={this.props.moveRight}>Right (&rarr;)</button>
        <button onClick={this.props.rotateBlock}>Rotate (&uarr;)</button>
        <button onClick={() => {}}>Down (&darr;)</button>
        <button onClick={this.props.drop}>Drop (SPACE)</button>
        <br/>
        <button onClick={() => {}}>Play Pause (P)</button>
        <button onClick={this.props.resetGame}>Reset (R)</button>
      </>
    );
  }
}

export default Control;
