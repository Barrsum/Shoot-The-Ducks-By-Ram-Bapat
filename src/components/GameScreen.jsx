// src/components/GameScreen.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Duck from './Duck';
import PauseMenu from './PauseMenu';
import './GameScreen.css';

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 600;

function GameScreen({ onGameOver, onGoHome, onShowHowToPlay }) {
    const [score, setScore] = useState(0); // Internal score
    const [lives, setLives] = useState(5); // Internal lives (start with 10, effectively 5 displayed)
    const [ducks, setDucks] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    // Ref to prevent workaround pause/resume if manually paused
    const isManuallyPausedRef = useRef(false);

    const gameAreaRef = useRef(null);
    const gameLoopIntervalRef = useRef(null);
    const duckSpawnTimeoutRef = useRef(null);
    const isMountedRef = useRef(true);

    // --- Display Values ---
    const displayScore = Math.floor(score / 1); // Display score = internal score
    const displayLives = Math.ceil(lives / 1); // Display lives = internal lives / 2 (rounded up)

    // console.log(`GameScreen Render - Score(Int): ${score}, Lives(Int): ${lives}, Paused: ${isPaused}, ManualPause: ${isManuallyPausedRef.current}`);

    // --- Game Configuration & Difficulty (Using internal score state) ---
    const BASE_DUCK_SPEED = 2;
    const MAX_DUCKS = 10;
    const DUCK_SPAWN_INTERVAL_MS = 1500;
    const calculateDuckSpeed = useCallback(() => BASE_DUCK_SPEED + Math.min(score / 10, 8), [score]);
    const calculateSpawnInterval = useCallback(() => Math.max(DUCK_SPAWN_INTERVAL_MS - (score * 10), 400), [score]);
    const calculateNumDucksToSpawn = useCallback(() => (score >= 150 ? 4 : score >= 100 ? 3 : score >= 50 ? 2 : 1), [score]);

    // --- Duck Spawning ---
    const spawnDuck = useCallback(() => {
        if (!isMountedRef.current || isPaused || !gameAreaRef.current) return; // isPaused check handles both manual and workaround pause
        const gameRect = gameAreaRef.current.getBoundingClientRect();
        const speed = calculateDuckSpeed();
        const numToSpawn = calculateNumDucksToSpawn();
        const spawnInterval = calculateSpawnInterval();

        setDucks(prevDucks => {
            // ... duck creation logic ...
            if (!isMountedRef.current) return prevDucks;
            if (prevDucks.length >= MAX_DUCKS) return prevDucks;
            const newDucksData = [];
             for (let i = 0; i < numToSpawn && (prevDucks.length + newDucksData.length) < MAX_DUCKS; i++) {
                 const id = Date.now() + Math.random();
                const startX = Math.random() * (gameRect.width - 50);
                const startY = gameRect.height;
                const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
                newDucksData.push({
                    id, x: startX, y: startY,
                    vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? 1 : -1),
                    vy: -Math.sin(angle) * speed,
                    isShot: false
                });
            }
            return [...prevDucks, ...newDucksData];
        });

        clearTimeout(duckSpawnTimeoutRef.current);
        // Don't schedule next spawn if paused
        if (!isPaused) {
            duckSpawnTimeoutRef.current = setTimeout(spawnDuck, spawnInterval);
        }
    }, [isPaused, calculateDuckSpeed, calculateNumDucksToSpawn, calculateSpawnInterval]); // isPaused dependency is correct

    // --- Duck Movement & Escape (Handles internal lives) ---
    useEffect(() => {
        // This effect correctly handles starting/stopping based on `isPaused`
        if (isPaused || !gameAreaRef.current) {
            clearInterval(gameLoopIntervalRef.current);
            return;
        }
        console.log("EFFECT: Starting Game Loop Interval");
        gameLoopIntervalRef.current = setInterval(() => {
            // ... interval logic ...
            if (!isMountedRef.current || !gameAreaRef.current) { clearInterval(gameLoopIntervalRef.current); return; }
             const gameRect = gameAreaRef.current.getBoundingClientRect();
             setDucks(currentDucks => {
                 if (!isMountedRef.current) return currentDucks;
                  const updatedDucks = currentDucks.map(duck => {
                    if (duck.isShot) return duck;
                    let newX = duck.x + duck.vx;
                    let newY = duck.y + duck.vy;
                    let newVx = duck.vx;
                    if (newX <= 0 || newX >= gameRect.width - 50) { newVx = -newVx; newX = duck.x + newVx; }
                    if (newY < -50) {
                        setLives(prevLives => {
                            if (!isMountedRef.current) return prevLives;
                            const newLives = Math.max(0, prevLives - 1);
                            console.log(`STATE: Duck ${duck.id} escape event. Internal Lives changing from ${prevLives} to ${newLives}`);
                            return newLives;
                        });
                        return null;
                    }
                    return { ...duck, x: newX, y: newY, vx: newVx };
                 }).filter(duck => duck !== null);
                return updatedDucks;
             });
        }, 1000 / 60);
        return () => {
            console.log("EFFECT CLEANUP: Clearing Game Loop Interval");
            clearInterval(gameLoopIntervalRef.current);
        };
    }, [isPaused]); // Re-runs correctly when isPaused changes

    // --- Check for Game Over ---
     useEffect(() => {
        if (isMountedRef.current && lives <= 0 && !isPaused) { // Use internal lives
            console.log("EFFECT: Game Over Triggered! Internal Lives:", lives);
            isManuallyPausedRef.current = false; // Reset manual pause state on game over
            setIsPaused(true); // Pause the game
            onGameOver(score); // Pass internal score
        }
    }, [lives, score, onGameOver, isPaused]); // Added isPaused dependency

    // --- Start Spawning & Mount Cleanup ---
    useEffect(() => {
        console.log("EFFECT: GameScreen Mounted");
        isMountedRef.current = true;
        isManuallyPausedRef.current = false; // Ensure manual pause is off on mount
        // Start spawning only if not paused initially (shouldn't be, but safe)
        if (!isPaused) {
             const startTimeout = setTimeout(() => {
                 if (isMountedRef.current && !isPaused) { // Double check pause and mount
                     console.log("EFFECT: Initial Spawn Called");
                     spawnDuck();
                 }
            }, 100);
             return () => clearTimeout(startTimeout); // Cleanup timeout specific to this branch
        }

        // General cleanup on unmount
        return () => {
            isMountedRef.current = false;
            clearInterval(gameLoopIntervalRef.current);
            clearTimeout(duckSpawnTimeoutRef.current);
            console.log("EFFECT CLEANUP: GameScreen Unmounted - Timers cleared.");
        };
        // Rerun if spawnDuck changes (which depends on score via calc funcs) OR if isPaused changes initially
    }, [spawnDuck, isPaused]);


    // --- Handle Shooting (Implementing Quick Pause/Resume Workaround) ---
    const handleShoot = useCallback((duckId) => {
         // Do nothing if manually paused or component unmounted
        if (isManuallyPausedRef.current || !isMountedRef.current) return;

        let scoreUpdatedThisClick = false;

        setDucks(prevDucks => {
            if (!isMountedRef.current) return prevDucks;
            return prevDucks.map(duck => {
                if (duck.id === duckId && !duck.isShot) {
                    console.log(`CALLBACK: Marking Duck ${duck.id} as shot.`);
                    if (!scoreUpdatedThisClick) {
                        setScore(prevScore => {
                            if (!isMountedRef.current) return prevScore;
                            const newScore = prevScore + 1;
                            console.log(`STATE: Score changing from ${prevScore} to ${newScore}`);

                            // ---> START WORKAROUND <---
                            // Only trigger workaround if not manually paused
                            if (!isManuallyPausedRef.current && isMountedRef.current) {
                                setIsPaused(true); // WORKAROUND PAUSE
                                console.log("WORKAROUND: Pausing briefly");
                                setTimeout(() => {
                                    // Resume only if component still mounted AND we weren't manually paused in the meantime
                                    if (isMountedRef.current && !isManuallyPausedRef.current) {
                                        setIsPaused(false); // WORKAROUND RESUME
                                         console.log("WORKAROUND: Resuming");
                                    } else {
                                        console.log("WORKAROUND: Resume skipped (unmounted or manually paused)");
                                    }
                                }, 0); // 0ms timeout
                            }
                            // ---> END WORKAROUND <---

                            return newScore;
                        });
                        scoreUpdatedThisClick = true;
                    }
                    // Schedule removal (keep separate)
                    setTimeout(() => {
                        if (!isMountedRef.current) return;
                        // console.log(`TIMEOUT: Removing duck ${duck.id} from array.`); // Can be verbose
                        setDucks(currentDucks => currentDucks.filter(d => d.id !== duckId));
                    }, 300); // Animation duration

                    return { ...duck, isShot: true, vx: 0, vy: 0 };
                }
                return duck;
            });
        });
    }, []); // Removed isPaused dependency - we check isManuallyPausedRef.current directly

    // --- Manual Pause Toggle ---
    const togglePause = () => {
        if (!isMountedRef.current) return;

        const enteringManualPause = !isPaused; // Are we about to *enter* manual pause?
        isManuallyPausedRef.current = enteringManualPause; // Update the ref based on manual action

        setIsPaused(prevState => {
            console.log("CALLBACK: Toggling Pause MANUALLY:", !prevState);
            return !prevState;
        });
        // If resuming manually, ensure spawning restarts if needed
        if (!enteringManualPause) {
             // Use a timeout to allow state to settle before restarting spawn loop
            setTimeout(() => {
                if(isMountedRef.current && !isPaused) { // Check state *after* timeout
                     console.log("Manual Resume: Restarting spawn check.");
                     spawnDuck(); // Restart spawn loop if appropriate
                }
            }, 0);
        }
    };

    // --- Render (Using Display Values) ---
    return (
        <div ref={gameAreaRef} className="game-screen" style={{ width: '100%', height: '100%', maxWidth: `${GAME_WIDTH}px`, maxHeight: `${GAME_HEIGHT}px` }}>
            <div className="hud">
                <span className="score">Score: {displayScore}</span>
                {/* Pass the manual pause toggle function */}
                <button className="pause-button" onClick={togglePause} aria-label={isPaused && lives > 0 ? "Resume Game" : "Pause Game"}>
                    {/* Display based on actual isPaused state */}
                    {isPaused && lives > 0 ? '▶️ Resume' : '⏸️ Pause'}
                </button>
                <span className="lives">Lives: {'❤️'.repeat(displayLives)}</span>
            </div>

            {/* Show pause menu only if manually paused */}
            {isPaused && isManuallyPausedRef.current && lives > 0 && (
                 <PauseMenu
                    onResume={togglePause} // Use the same toggle function
                    onRestart={() => { console.log("Restart from pause not implemented yet"); onGoHome(); }}
                    onGoHome={onGoHome}
                    onShowHowToPlay={() => onShowHowToPlay(true)}
                />
            )}

            {ducks.map(duck => (
                 <Duck
                     key={duck.id}
                     id={duck.id}
                     x={duck.x}
                     y={duck.y}
                     isShot={duck.isShot}
                     onShoot={handleShoot}
                 />
             ))}
        </div>
    );
}

export default GameScreen;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos