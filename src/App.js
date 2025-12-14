import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); 
  const [gameMode, setGameMode] = useState(null);

  const handleStartGame = (mode) => {
    setGameMode(mode);
    setCurrentScreen('game');
  };

  const handleEndGame = () => {
    setCurrentScreen('start');
    setGameMode(null);
  };

  return (
    <div className="font-sans antialiased">
      {currentScreen === 'start' && <StartScreen oyunuBaslat={handleStartGame} />}
      {currentScreen === 'game' && <GameScreen oyunModu={gameMode} oyunBitince={handleEndGame} />}
    </div>
  );
}