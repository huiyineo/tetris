import React from "react";

class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.style === 0 ? "dot" : "dot filled"}></div>
    );
  }
}

export default Dot;
