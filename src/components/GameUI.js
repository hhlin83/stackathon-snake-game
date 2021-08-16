// Import modules
import React from 'react';

export default function GameUI() {
  return (
    <div id="game-ui">
      <div id="game-start-ui">
        <h5 id="game-welcome-title">WELCOME TO</h5>
        <h1 id="game-start-title">SNAKE? GAME</h1>
        <button id="start-button" type="button">
          Start Game
        </button>
      </div>
      <div id="game-over-ui" style={{ display: 'none' }}>
        <h1 id="game-over-title">Game Over</h1>
        <button id="restart-button" type="button">
          Restart
        </button>
      </div>
    </div>
  );
}
