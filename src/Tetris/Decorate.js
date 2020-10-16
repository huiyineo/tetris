import React from "react";
import Dot from "./Commons/Dot";
import Block from "./Commons/Block";

class Decorate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [
        Block.new("I"),
        Block.new("J"),
        Block.new("L"),
        Block.new("O"),
        Block.new("S"),
        Block.new("T"),
        Block.new("Z"),
      ],
    };
  }

  render() {
    const smallBoard = this.state.blocks.map((block, blockIdx) => {
      return (
        <div key={blockIdx} className="decorate-block">
          {block.content.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((value, colIdx) =>
                value !== 0 ? (
                  <Dot key={colIdx} isActivated={value !== 0} />
                ) : (
                  ""
                )
              )}
            </div>
          ))}
        </div>
      );
    });

    return <>{smallBoard}</>;
  }
}

export default Decorate;
