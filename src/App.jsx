// src/App.jsx
import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import HowToPlayModal from './components/HowToPlayModal';
import Footer from './components/Footer';
import Header from './components/Header'; // Already imported
import './App.css';

function App() {
    const [gameState, setGameState] = useState('start');
    const [score, setScore] = useState(0);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    // ... (Callbacks remain the same: handleStartGame, handleGameOver, handleRestart, handleGoHome, toggleHowToPlay) ...
    const handleStartGame = useCallback(() => {
        setGameState('playing');
        setShowHowToPlay(false);
    }, []);

    const handleGameOver = useCallback((finalScore) => {
        setScore(finalScore);
        setGameState('gameover');
        setShowHowToPlay(false);
    }, []);

    const handleRestart = useCallback(() => {
        setGameState('playing');
        setShowHowToPlay(false);
    }, []);

    const handleGoHome = useCallback(() => {
        setGameState('start');
        setShowHowToPlay(false);
    }, []);

    const toggleHowToPlay = useCallback((show) => {
        setShowHowToPlay(show);
    }, []);


    const renderScreen = () => {
        switch (gameState) {
            case 'playing':
                return <GameScreen
                            key="gameScreen"
                            onGameOver={handleGameOver}
                            onGoHome={handleGoHome}
                            onShowHowToPlay={toggleHowToPlay}
                        />;
            case 'gameover':
                return <GameOverScreen
                            key="gameOverScreen"
                            score={score}
                            onRestart={handleRestart}
                            onGoHome={handleGoHome}
                         />;
            case 'start':
            default:
                return <StartScreen
                            key="startScreen"
                            onStartGame={handleStartGame}
                            onShowHowToPlay={() => toggleHowToPlay(true)}
                        />;
        }
    };

    return (
        <div className="App">
            {/* Render Header if playing OR gameover */}
            {(gameState === 'playing' || gameState === 'gameover') && <Header />}

            <main className="main-content">
                {renderScreen()}
            </main>

            <Footer />
            {showHowToPlay && <HowToPlayModal onClose={() => toggleHowToPlay(false)} />}
        </div>
    );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos