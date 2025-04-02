// src/components/HowToPlayModal.jsx
import React from 'react';
import './HowToPlayModal.css';

function HowToPlayModal({ onClose }) {
    // Prevent clicks inside the modal from closing it
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // The overlay div listens for clicks to close the modal
        <div className="modal-overlay" onClick={onClose}>
            {/* The content div prevents click propagation */}
            <div className="modal-content" onClick={handleModalContentClick}>
                <button className="modal-close-button" onClick={onClose} aria-label="Close How to Play">×</button>
                <h2>How to Play: Shoot The Duck</h2>

                <div className="instructions">
                    <p>🦆 Ducks will fly up from the bottom of the screen.</p>
                    <p>🖱️ Aim your cursor (the crosshair) over a duck.</p>
                    <p>💥 Click (or tap on mobile) to shoot the duck!</p>
                    <p>📈 Each duck shot earns you <strong>1 point</strong>.</p>
                    <p>⚠️ Ducks will fly faster and more will appear as your score increases.</p>
                    <p>❤️ If a duck reaches the top edge without being shot, you lose a life.</p>
                    <p>💔 You start with <strong>5 lives</strong>. If you lose all lives, the game is over!</p>
                    <p>⏸️ You can pause the game anytime using the pause button.</p>
                </div>

                <button className="modal-ok-button" onClick={onClose}>Got it!</button>
            </div>
        </div>
    );
}

export default HowToPlayModal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos