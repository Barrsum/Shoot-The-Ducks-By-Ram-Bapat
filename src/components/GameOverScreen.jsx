// src/components/GameOverScreen.jsx
import React from 'react';
import './GameOverScreen.css'; // We will rewrite this CSS

function GameOverScreen({ score, onRestart, onGoHome }) {
  // Assuming internal score is passed, calculate display score if needed
  const displayScore = Math.floor(score / 1); // Adjust if you used score / 2

  return (
    // Add a class for the new style and animation
    <div className="game-over-screen game-over-v2 animate-pop-in">
      <h2 className="game-over-title-v2">GAME OVER</h2>

      <div className="final-score-panel-v2">
        <span className="final-score-label-v2">SCORE</span>
        <span className="final-score-value-v2">{displayScore}</span>
      </div>

      <div className="game-over-buttons-v2">
        <button className="game-over-btn-v2 replay-btn" onClick={onRestart}>
          REPLAY
        </button>
        <button className="game-over-btn-v2 home-btn" onClick={onGoHome}>
          HOME
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;


// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos