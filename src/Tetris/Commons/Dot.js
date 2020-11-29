import React from "react";

class Dot extends React.Component {
  render() {
    return (
      <>
        <div className={this.props.isActivated 
          ? "dot filled" + (this.props.value ? this.props.value % 10 : "") : "dot"}></div>
        {/* <span className="dot-content">
          {this.props.value ? this.props.value : ""}
        </span> */}
      </>
    );
  }
}

export default Dot;
