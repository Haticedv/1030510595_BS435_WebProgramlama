import React, { useState, useEffect, useCallback } from 'react';
import imagesData from '../data/imagesData';
import './GameScreen.css';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod'
};
const SURE_LIMITI = 60; 

function GameScreen({ oyunModu, oyunBitince }) { 
  const [aktifTur, setAktifTur] = useState(null); 
  const [turDurumu, setTurDurumu] = useState('tahmin_bekleniyor'); 
  const [secilenResimID, setSecilenResimID] = useState(null); 
  const [tahminHakki, setTahminHakki] = useState(1); 
  const [puan, setPuan] = useState(0); 
  const [kalanSure, setKalanSure] = useState(SURE_LIMITI); 

  // 1.tur
  
  const yeniTurYukle = useCallback(() => {
    const rastgeleIndex = Math.floor(Math.random() * imagesData.length);
    setAktifTur(imagesData[rastgeleIndex]);
    
    // Durumları sıfırla
    setTurDurumu('tahmin_bekleniyor');
    setSecilenResimID(null);
    setTahminHakki(1);
  }, []);

  useEffect(() => {
    yeniTurYukle();
  }, [yeniTurYukle, oyunModu]);

  // zaman yarışı
  
  useEffect(() => {
    if (oyunModu === OYUN_MODLARI.SURELI) {
      if (kalanSure > 0 && turDurumu === 'tahmin_bekleniyor') {
        const sayac = setTimeout(() => setKalanSure(kalanSure - 1), 1000);
        return () => clearTimeout(sayac);
      } else if (kalanSure === 0) {
        setTurDurumu('oyun_bitti_ekrani');
      }
    }
  }, [oyunModu, kalanSure, turDurumu]);
  

  const kullaniciTahmininiIsle = (secilenID, isAI) => {
    
    if (turDurumu !== 'tahmin_bekleniyor' && turDurumu !== 'ipucu_verildi') return;

    setSecilenResimID(secilenID);

    //  Önce modu kontrol et
    if (oyunModu === OYUN_MODLARI.KLASIK) {
      if (isAI) {
        // klasik ve doğru tahminse
        setTurDurumu('dogru_bildin');
        setPuan(mevcutPuan => mevcutPuan + 1);
        setTahminHakki(3); 
      } else if (tahminHakki === 1) {
        // klasik ve yanlış tahminse
        setTurDurumu('ipucu_verildi'); // İpucu göster
        setTahminHakki(2); // İkinci şansa geç
      } else {
        // klasik  ve yanlış
        setTurDurumu('yanlis_bildin_sonuc'); // Sonucu göster
        setTahminHakki(3); 
      }
    } 
    // 2. Süreli Mod 
    else if (oyunModu === OYUN_MODLARI.SURELI) {
      if (isAI) {
        // süreli ve doğru tahminse
        setTurDurumu('dogru_bildin');
        setPuan(mevcutPuan => mevcutPuan + 1);
        setTimeout(yeniTurYukle, 500); // yeni tura geç
      } else {
        // süreli ve yanlış tahminse
        setTurDurumu('yanlis_bildin_hizli_gec'); // Yanlışı göster
        setKalanSure(t => Math.max(0, t - 5)); // 5 saniye ceza
        setTimeout(yeniTurYukle, 1000); // Hata mesajından sonra yeni tura geç
      }
    }
  };
  
  // Hangi görsellerin gösterileceği
  const gosterilecekResimler = aktifTur 
    ? turDurumu === 'ipucu_verildi'
      ? aktifTur.images.filter(img => img.id !== secilenResimID) // İkinci şansta yanlış seçileni kaldır
      : aktifTur.images // Normal 3 resmi göster
    : [];

  // Oyun bittiyse skor ekranı göster
  if (turDurumu === 'oyun_bitti_ekrani') {
    return (
      <div className="game-over-screen">
        <h2>Oyun Bitti!</h2>
        <h3>Toplam Puanınız: {puan}</h3>
        <button onClick={oyunBitince} className="back-to-start-button">
          Ana Ekrana Dön
        </button>
      </div>
    );
  }

  // Oyun devam ediyorsa.
  return (
    <div className="game-screen-container">
      <div className="game-info">
        <p>Puan: <strong>{puan}</strong></p>
        {oyunModu === OYUN_MODLARI.SURELI && (
          <p>Süre: <strong className={kalanSure <= 10 ? 'time-low' : ''}>{kalanSure}s</strong></p>
        )}
      </div>

      <h2>Kategori: {aktifTur?.topic}</h2>
      {turDurumu === 'ipucu_verildi' && (
        <div className="hint-section">
          <p className="hint-text">İpucu: {aktifTur.hint}</p>
          <p><strong>Son şans! Kalan görsellerden AI olanı bul.</strong></p>
        </div>
      )}

      <div className="images-grid">
        {gosterilecekResimler.map((image) => (
          <div 
            key={image.id}
            className={`image-container 
              ${secilenResimID === image.id ? 'selected' : ''} 
              ${turDurumu === 'dogru_bildin' && image.isAI ? 'correct-answer' : ''}
              ${(turDurumu === 'yanlis_bildin_sonuc' || turDurumu === 'yanlis_bildin_hizli_gec') && image.isAI ? 'missed-answer' : ''}`}
            onClick={() => kullaniciTahmininiIsle(image.id, image.isAI)}
          >
            <img src={image.src} alt={image.id} className="game-image" />
          </div>
        ))}
      </div>
      {turDurumu === 'dogru_bildin' && (
        <div className="result-message correct">
          <h2>Mükemmel! Doğru Tahmin!</h2>
          {oyunModu === OYUN_MODLARI.KLASIK && (
             <button onClick={yeniTurYukle} className="next-round-button">
              Yeni Tur Oyna
            </button>
          )}
        </div>
      )}
      
      {turDurumu === 'yanlis_bildin_sonuc' && (
         <div className="result-message incorrect">
          <h2>Yanlış Tahmin.</h2>
          <p>AI tarafından üretilen görsel vurgulandı.</p>
           <button onClick={yeniTurYukle} className="next-round-button">
              Yeni Tur Oyna
            </button>
        </div>
      )}

      {turDurumu === 'yanlis_bildin_hizli_gec' && (
         <div className="result-message incorrect">
          <h2>Yanlış! Hızlıca devam...</h2>
        </div>
      )}

    </div>
  );
}

export default GameScreen;