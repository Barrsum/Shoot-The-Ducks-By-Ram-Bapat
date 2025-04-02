// src/components/Duck.jsx
import React, { useState, useEffect } from 'react';
import './Duck.css';

// Removed isEscaping prop
function Duck({ id, x, y, isShot, onShoot }) {
    const [showExplosion, setShowExplosion] = useState(false);

    // Handle the shot effect
    useEffect(() => {
        if (isShot) {
            setShowExplosion(true);
            // Optional: Play sound effect
            // const audio = new Audio('/sounds/shot.wav'); audio.play();

            // No timer needed here to hide explosion state; the component will be removed later by GameScreen
        } else {
             // Reset if the component is reused (unlikely but safe)
             setShowExplosion(false);
        }
    }, [isShot]);


    const handleClick = (e) => {
        e.stopPropagation();
        // Only shoot if not already shot
        if (!isShot) {
            onShoot(id);
        }
    };

    const duckClass = `duck ${isShot ? 'shot' : ''} ${showExplosion ? 'explosion' : ''}`;

    return (
        <div
            className={duckClass}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
            onClick={handleClick}
        >
            {/* Only render body if not exploding */}
            {!showExplosion && <div className="duck-body"></div>}
            {/* Explosion is CSS pseudo-element on parent div */}
        </div>
    );
}

export default React.memo(Duck);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos