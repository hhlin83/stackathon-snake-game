// Import modules
import React from 'react';

export default function GameUI() {
  const checkMobile = function () {
    const match = window.matchMedia('(pointer:coarse)');
    return match && match.matches;
  };
  const isMobile = checkMobile();
  // const isMobile = true;

  return (
    <div id="game-ui">
      {isMobile ? (
        <div>
          <button id="mobile-joystick-right" type="button">
            <img src="/mobile-joystick.png" alt="right mobile joystick" />
          </button>
          <button id="mobile-joystick-left" type="button">
            <img src="/mobile-joystick.png" alt="left mobile joystick" />
          </button>
        </div>
      ) : (
        <img
          id="game-controls-img"
          src="/game-controls-icons.png"
          alt="game controls"
        />
      )}
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
