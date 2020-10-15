import React from "react";
import Dot from "./Dot";
import Block from "./Block";
import utils from "../../Utils/utils";

class SmallBoard extends React.Component {
  render() {
    const block = utils.blockToMatrix(
      Block.next(this.props.blockName).content,
      2,
      4
    );
    
    const smallBoard = block.map((row, rowIdx) => {
      return (
        <div key={rowIdx}>
          {row.map((value, colIdx) => {
            return <Dot key={colIdx} isActivated={value !== 0} />;
          })}
        </div>
      );
    });

    return (
      <>
        <div className="section-title">Next</div>

        {smallBoard}
      </>
    );
  }
}

export default SmallBoard;
