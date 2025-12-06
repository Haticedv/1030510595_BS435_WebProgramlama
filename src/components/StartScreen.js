import React from 'react';
import { Play, Clock } from 'lucide-react';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod'
};
const SURE_LIMITI = 60;

const StartScreen = ({ oyunuBaslat }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 text-center">
      <div className="mb-8 p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI vs Gerçek
        </h1>
        <p className="text-slate-300 mb-6 text-lg">
          Yapay zeka tarafından oluşturulan içerikleri ayırt edebilir misin? 
          Karşına çıkacak 3 görselden <strong>1 tanesi AI (Yapay Zeka)</strong> üretimidir.
        </p>
        
        <div className="bg-slate-700/50 p-4 rounded-lg text-left mb-8">
          <h3 className="font-bold text-blue-300 mb-2">Nasıl Oynanır?</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
            <li>Her turda 3 görsel gösterilir.</li>
            <li>Amacın AI tarafından üretileni bulmaktır.</li>
            <li><strong>Klasik Mod:</strong> Yanlış yaparsan ipucu alırsın ve ikinci bir şansın olur.</li>
            <li><strong>Süreli Mod:</strong> {SURE_LIMITI} saniyen var! Yanlış tahmin süreni 5 saniye azaltır.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => oyunuBaslat(OYUN_MODLARI.KLASIK)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
          >
            <Play size={20} /> Klasik Mod
          </button>
          <button 
            onClick={() => oyunuBaslat(OYUN_MODLARI.SURELI)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-900/50"
          >
            <Clock size={20} /> Süreli Mod
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;