import React, { useState, useEffect } from 'react';
import { imagesData } from '../data/imagesData'; 
import './GameScreen.css';


function GameScreen() {

  const [gameStatus, setGameStatus] = useState('playing'); 
  const [currentRound, setCurrentRound] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [disabledImages, setDisabledImages] = useState([]); // Yanlış tıklananları deaktif etmek için

  // Oyunu başlatma,her turda
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Rastgele bir görsel grubu seçme
    const randomIndex = Math.floor(Math.random() * imagesData.length);
    setCurrentRound(imagesData[randomIndex]);
    
    // Tüm durumları başlangıç değerlerine döndürme
    setGameStatus('playing');
    setIsCorrect(false);
    setDisabledImages([]);
  };

  const handleImageSelect = (selectedImage) => {
    // Eğer tur bittiyse veya resim deaktif ise işlem yapma
    if (gameStatus === 'finished' || disabledImages.includes(selectedImage.id)) {
      return;
    }

    // Seçim doğru ise
    if (selectedImage.isAI) {
      setIsCorrect(true);
      setGameStatus('finished');
    } 
    // Seçim yanlış ise
    else {
      // İlk tahmin yanlış ise 
      if (gameStatus === 'playing') {
        setDisabledImages([selectedImage.id]); // Tıklanan yanlış resmi deaktif et
        setGameStatus('hint'); // ipucu ver ve  ikinci şans moduna geçir
      } 
      // ikinci tahminde  yanlış ise 
      else if (gameStatus === 'hint') {
        setIsCorrect(false); // kesinlik için
        setGameStatus('finished'); // Oyunu bitir
      }
    }
  };

  // sunulucak görselleri belirleme
  const imagesToDisplay = gameStatus === 'hint' 
    ? currentRound.images.filter(img => !disabledImages.includes(img.id))
    : currentRound?.images;

  if (!currentRound) {
    return <div>Oyun Yükleniyor...</div>;
  }
  
  return (
    <div className="game-container">
      <h2>Yapay Zeka Tarafından Üretilen Görseli Bul!</h2>
      
      {/* Mesajlar ve İpuçları Alanı */}
      <div className="info-area">
        {gameStatus === 'playing' && <p>Lütfen tahminini yap.</p>}
        {gameStatus === 'hint' && <p className="hint-text">Yanlış tahmin! İpucu: {currentRound.hint}</p>}
        {gameStatus === 'finished' && (
          isCorrect 
            ? <h3 className="correct-answer">Tebrikler, doğru!</h3>
            : <h3 className="wrong-answer">Maalesef yanlış :/ </h3>
        )}
      </div>

      {/* resimlerin Gösterilmesi */}
      {gameStatus !== 'finished' && (
        <div className="images-grid">
          {imagesToDisplay.map((image) => (
            <div
              key={image.id}
              className={`image-wrapper ${disabledImages.includes(image.id) ? 'disabled' : ''}`}
              onClick={() => handleImageSelect(image)}
            >
              <img src={image.src} alt="tahmin görseli" />
            </div>
          ))}
        </div>
      )}

      {/* Sonuç ve Yeni Tur  */}
      {gameStatus === 'finished' && (
        <div className="result-area">
          {/*doğru görsel gösterilebilir */}
          <button onClick={startNewRound} className="next-round-btn">
            Yeni Tur
          </button>
        </div>
      )}
    </div>
  );
}
const initializeNewRound = () => {
  // Oyun moduna göre uygun resimler
  const potentialImages = IMAGE_DATA.filter(img => img.mode === mode);

  // Rastgele bir AI görseli seçme ve başlama
  const aiImageToUse = potentialImages
    .filter(img => img.isAI)
    .at(Math.floor(Math.random() * potentialImages.filter(img => img.isAI).length));

  // Kalan görsellerden iki gerçek görseli rastgele seçme
  const realImagePool = potentialImages.filter(img => !img.isAI);
  const selectedRealImages = [];
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * realImagePool.length);
    selectedRealImages.push(realImagePool.splice(randomIndex, 1)[0]);
  }

  // Tüm seçilen görselleri karıştırıp yeni tur dizisini oluşturma
  const imagesForThisRound = [aiImageToUse, ...selectedRealImages].sort(() => Math.random() - 0.5);

  // Component state'ini yeni duruma göre
  setRoundImages(imagesForThisRound);
  setSelectedImageId(null);
  setGuessAttempt(1);
  setIsHintShown(false);
  setRoundStatus('active');
};

export default GameScreen;