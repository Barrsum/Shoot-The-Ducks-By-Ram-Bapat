// src/components/Header.jsx
import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="app-header">
            <h2 className="game-title">Shoot The Ducks</h2>
            <span className="author-name">- by Ram Bapat -</span>
        </header>
    );
}

// Header is static during gameplay, memoize it
export default React.memo(Header);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos