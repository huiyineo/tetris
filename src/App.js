import React, { useState } from "react";
import "./App.css";

import Tetris from "./Tetris/Tetris";

function App() {
  const [gameId, setGameId] = useState(1);
  return (
    <div className="App">
      <Tetris key={gameId} resetGame={() => setGameId(gameId + 1)} />
    </div>
  );
}

export default App;
