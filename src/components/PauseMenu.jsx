// src/components/PauseMenu.jsx
import React from 'react';
import './PauseMenu.css';

function PauseMenu({ onResume, onGoHome, onShowHowToPlay }) {
    return (
        <div className="pause-overlay">
            <div className="pause-menu">
                <h2>Paused</h2>
                <div className="pause-buttons">
                    <button onClick={onResume}>Resume</button>
                    <button onClick={onShowHowToPlay}>How to Play</button>
                    <button onClick={onGoHome}>Back to Home</button>
                    {/* Add Restart later if needed: <button onClick={onRestart}>Restart Game</button> */}
                </div>
            </div>
        </div>
    );
}

export default PauseMenu;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos