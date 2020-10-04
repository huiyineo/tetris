import React from "react";

class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.style === 0 ? "dot" : "dot filled"}>{this.props.style}</div>
    );
  }
}

export default Dot;
