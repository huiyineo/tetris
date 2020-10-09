import React from "react";

class Dot extends React.Component {
  render() {
    return (
      <>
      <div className={this.props.isActivated ? "dot filled" : "dot"}></div>
      <span className="dot-content">{this.props.value ? this.props.value : ""}</span>
      </>
    );
  }
}

export default Dot;
