import React from "react";

class Dot extends React.Component {
  render() {
    return (
      <div className={this.props.isActivated ? "dot" : "dot filled"}></div>
    );
  }
}

export default Dot;
