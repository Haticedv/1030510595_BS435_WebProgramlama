import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import './App.css';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod' 
};

const EKRAN_DURUMU = {
  BASLANGIC: 'baslangic_ekrani', 
  OYUN: 'oyun_ekrani' 
};

function App() {
  const [aktifEkran, setAktifEkran] = useState(EKRAN_DURUMU.BASLANGIC);
  const [secilenMod, setSecilenMod] = useState(OYUN_MODLARI.KLASIK);

  const oyunuBaslat = (mode) => {
    setSecilenMod(mode);
    setAktifEkran(EKRAN_DURUMU.OYUN);
  };
  
  // Oyunu bitince ana ekrana döner
  const anaEkranaDon = () => {
    setAktifEkran(EKRAN_DURUMU.BASLANGIC);
  };

  return (
    <div className="App">
      {aktifEkran === EKRAN_DURUMU.BASLANGIC ? (
        <StartScreen 
          oyunuBaslat={oyunuBaslat} 
          oyunModlari={OYUN_MODLARI} 
        />
      ) : (
        <GameScreen 
          oyunModu={secilenMod} 
          oyunBitince={anaEkranaDon} 
        /> 
      )}
    </div>
  );
}

export default App;
