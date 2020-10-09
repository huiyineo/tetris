import React from "react";

class Dot extends React.Component {
  render() {
    return (
      <div className={this.props.isActivated ? "dot filled" : "dot"}></div>
    );
  }
}

export default Dot;
