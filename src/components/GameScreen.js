import React, { useState, useEffect, useCallback } from 'react';
import { Play, Clock, AlertCircle, CheckCircle, XCircle, RefreshCw, Trophy, Zap } from 'lucide-react';
import imagesData from '../data/imagesData';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod'
};
const SURE_LIMITI = 60;


const diziyiKaristir = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function GameScreen({ oyunModu, oyunBitince }) { 
  const [aktifTur, setAktifTur] = useState(null); 
  const [turDurumu, setTurDurumu] = useState('tahmin_bekleniyor'); 
  const [secilenResimID, setSecilenResimID] = useState(null); 
  const [tahminHakki, setTahminHakki] = useState(1); 
  const [puan, setPuan] = useState(0); 
  const [kalanSure, setKalanSure] = useState(SURE_LIMITI); 


  const saveScore = (finalScore) => {
    console.log(`Skor Kaydedildi -> Puan: ${finalScore}`);
  };

  const yeniTurYukle = useCallback(() => {
    const rastgeleKonuIndex = Math.floor(Math.random() * imagesData.length);
    const secilenKategori = imagesData[rastgeleKonuIndex];

    const yapayZekaResimleri = secilenKategori.images.filter(img => img.isAI);
    const gercekResimler = secilenKategori.images.filter(img => !img.isAI);

    
    const oyunIcinAI = yapayZekaResimleri[Math.floor(Math.random() * yapayZekaResimleri.length)];
    const oyunIcinGercekler = diziyiKaristir(gercekResimler).slice(0, 2);

   
    const finalResimListesi = diziyiKaristir([oyunIcinAI, ...oyunIcinGercekler]);

    const yeniTurVerisi = {
      ...secilenKategori,
      images: finalResimListesi 
    };

    setAktifTur(yeniTurVerisi);
    setTurDurumu('tahmin_bekleniyor');
    setSecilenResimID(null);
    setTahminHakki(1);
  }, []);

  useEffect(() => {
    yeniTurYukle();
  }, [yeniTurYukle, oyunModu]);


  useEffect(() => {
    if (oyunModu === OYUN_MODLARI.SURELI) {
      if (kalanSure > 0 && turDurumu === 'tahmin_bekleniyor') {
        const sayac = setTimeout(() => setKalanSure(kalanSure - 1), 1000);
        return () => clearTimeout(sayac);
      } else if (kalanSure === 0) {
        setTurDurumu('oyun_bitti_ekrani');
        saveScore(puan);
      }
    }
  }, [oyunModu, kalanSure, turDurumu, puan]);
  
  const kullaniciTahmininiIsle = (secilenID, isAI) => {
    if (turDurumu !== 'tahmin_bekleniyor' && turDurumu !== 'ipucu_verildi') return;
    setSecilenResimID(secilenID);

    if (oyunModu === OYUN_MODLARI.KLASIK) {
      if (isAI) {
        setTurDurumu('dogru_bildin');
        setPuan(prev => prev + 10);
        setTahminHakki(3); 
      } else if (tahminHakki === 1) {
        setTurDurumu('ipucu_verildi');
        setTahminHakki(2);
      } else {
        setTurDurumu('yanlis_bildin_sonuc');
        setTahminHakki(3); 
      }
    } else if (oyunModu === OYUN_MODLARI.SURELI) {
      if (isAI) {
        setTurDurumu('dogru_bildin');
        setPuan(prev => prev + 15);
        setTimeout(yeniTurYukle, 800);
      } else {
        setTurDurumu('yanlis_bildin_hizli_gec');
        setKalanSure(t => Math.max(0, t - 5));
        setTimeout(yeniTurYukle, 1000);
      }
    }
  };
  
  const gosterilecekResimler = aktifTur 
    ? turDurumu === 'ipucu_verildi'
      ? aktifTur.images.filter(img => img.id !== secilenResimID)
      : aktifTur.images 
    : [];

  if (turDurumu === 'oyun_bitti_ekrani') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
        <div className="bg-slate-800/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center shadow-2xl max-w-md w-full">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h2 className="text-4xl font-bold mb-2">Oyun Bitti!</h2>
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-8">{puan} <span className="text-lg text-slate-500 font-medium">Puan</span></div>
          <button 
            onClick={oyunBitince} 
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} /> Yeniden Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-white p-4 flex flex-col items-center">
      

      <div className="w-full max-w-5xl flex justify-between items-center bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 mb-8 mt-4 shadow-xl">
        <div className="flex flex-col">
           <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Toplam Skor</span>
           <div className="text-3xl font-black font-mono flex items-center gap-2">
             <Zap className="w-5 h-5 text-yellow-400 fill-current" /> {puan}
           </div>
        </div>
        
        <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
            <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">{aktifTur?.topic}</span>
        </div>

        {oyunModu === OYUN_MODLARI.SURELI && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-pink-400 uppercase tracking-widest font-bold">Kalan Süre</span>
            <div className={`text-3xl font-black font-mono flex items-center gap-2 ${kalanSure <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              {kalanSure}<span className="text-sm text-slate-500">s</span> <Clock size={20} />
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl flex-grow flex flex-col items-center">
        
       
        <div className="mb-8 text-center min-h-[80px] flex items-center justify-center">
            {turDurumu === 'ipucu_verildi' && (
                <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-200 px-6 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                <AlertCircle className="shrink-0" />
                <div className="text-left"><span className="font-bold block text-xs uppercase tracking-wider text-yellow-500">Sistem Analizi:</span> {aktifTur.hint}</div>
                </div>
            )}
            {turDurumu === 'dogru_bildin' && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-300 px-8 py-3 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <CheckCircle className="shrink-0 w-8 h-8" /> 
                <span className="text-xl font-bold tracking-tight">DOĞRU TESPİT</span>
                </div>
            )}
            {(turDurumu === 'yanlis_bildin_sonuc' || turDurumu === 'yanlis_bildin_hizli_gec') && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-8 py-3 rounded-xl flex items-center gap-3">
                <XCircle className="shrink-0 w-8 h-8" /> 
                <span className="text-xl font-bold tracking-tight">YANLIŞ TESPİT</span>
                </div>
            )}
            {turDurumu === 'tahmin_bekleniyor' && (
                 <h2 className="text-2xl md:text-3xl font-medium text-center text-slate-300">
                 Hangisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">AI (Yapay Zeka)</span> üretimi?
               </h2>
            )}
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          {gosterilecekResimler.map((image, index) => {
            let containerClass = "border-white/5 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]";

            if (secilenResimID === image.id) {
                containerClass = "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-[1.02]";
            }
            if (turDurumu === 'dogru_bildin' && image.isAI) {
                containerClass = "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.6)] scale-[1.03] ring-2 ring-green-400/50";
            }
            if ((turDurumu === 'yanlis_bildin_sonuc' || turDurumu === 'yanlis_bildin_hizli_gec') && image.isAI) {
                 containerClass = "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] ring-2 ring-purple-400/50";
            }
            if ((turDurumu === 'yanlis_bildin_sonuc' || turDurumu === 'yanlis_bildin_hizli_gec') && secilenResimID === image.id && !image.isAI) {
                containerClass = "border-red-500 opacity-60 grayscale";
            }
            if (turDurumu === 'dogru_bildin' && !image.isAI) {
                containerClass = "border-white/5 opacity-30 grayscale blur-[2px]";
            }

            return (
              <div 
                key={image.id}
                onClick={() => kullaniciTahmininiIsle(image.id, image.isAI)}
                className={`
                    relative group cursor-pointer transition-all duration-500 ease-out 
                    rounded-2xl overflow-hidden border-[3px] aspect-square bg-slate-800
                    ${containerClass}
                `}
              >
                <img 
                    src={image.src} 
                    alt="Tahmin et" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
         
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-xs font-mono text-white/80 border border-white/30 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                        SYSTEM_SCAN_0{index + 1}
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-16 flex items-center justify-center w-full">
            {(turDurumu === 'dogru_bildin' || turDurumu === 'yanlis_bildin_sonuc') && oyunModu === OYUN_MODLARI.KLASIK && (
            <button 
                onClick={yeniTurYukle} 
                className="group px-10 py-4 bg-white text-black hover:bg-blue-50 rounded-full font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
                SONRAKİ ANALİZ <Play size={20} fill="black" className="group-hover:translate-x-1 transition-transform" />
            </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default GameScreen;