 // src/components/StartScreen.jsx
 import React from 'react';
 import './StartScreen.css';

 function StartScreen({ onStartGame, onShowHowToPlay }) {
   return (
     // Add animation class to the container
     <div className="start-screen animate-fade-in">
       <h1 className="start-title">Shoot The Ducks</h1>
       <p className="start-author">- Created by Ram Bapat -</p>
       <div className="start-button-container">
         <button className="start-button" onClick={onStartGame}>Start Game</button>
         <button className="start-button secondary" onClick={onShowHowToPlay}>
           How to Play
         </button>
       </div>
     </div>
   );
 }

 export default StartScreen;

//  Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos