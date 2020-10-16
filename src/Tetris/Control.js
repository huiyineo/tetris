import React from "react";

class Control extends React.Component {
  render() {
    return (
      <>
        <button onClick={() => {}}>Left</button>
        <button onClick={() => {}}>Right</button>
        <button onClick={() => {}}>Down</button>
        <button onClick={() => {}}>Drop</button>
        <button onClick={() => {}}>Rotate</button>
        <button onClick={() => {}}>Play Pause</button>
        <button onClick={this.props.resetGame}>Reset</button>
      </>
    );
  }
}

export default Control;
