import React from 'react';
import { Play, Clock, BrainCircuit } from 'lucide-react';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod'
};

const StartScreen = ({ oyunuBaslat }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-white p-6 text-center">
      <div className="relative mb-8 p-8 bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-2xl w-full overflow-hidden">
        
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 flex flex-col items-center">
          <BrainCircuit className="w-20 h-20 text-blue-400 mb-4 animate-pulse" />
          
          <h1 className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tighter drop-shadow-lg">
            AI mi GERÇEK mi ?
          </h1>
          <p className="text-blue-100/80 mb-8 text-lg font-light tracking-wide">
            Teknolojinin ulaştığı son noktayı deneyimleyin.
          </p>
          
          <div className="bg-white/5 p-6 rounded-2xl text-left mb-8 w-full border border-white/5">
            <h3 className="font-bold text-purple-300 mb-3 text-sm tracking-wider uppercase">Görev Dosyası:</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Her turda karşına 3 görsel gelecek,analiz et.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Sadece <strong>1 tanesi AI</strong> (Yapay Zeka) üretimidir.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Yanlış tahminde sistem ipucu verir.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            <button 
              onClick={() => oyunuBaslat(OYUN_MODLARI.KLASIK)}
              className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-white/10"
            >
              <Play className="w-6 h-6 fill-current" />
              <div className="text-left">
                <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Başlangıç</div>
                <div className="text-lg">Klasik Mod</div>
              </div>
            </button>

            <button 
              onClick={() => oyunuBaslat(OYUN_MODLARI.SURELI)}
              className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-fuchsia-700 to-purple-600 hover:from-fuchsia-600 hover:to-purple-500 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] border border-white/10"
            >
              <Clock className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs font-medium opacity-80 uppercase tracking-wider">60 Saniye</div>
                <div className="text-lg">Süreli Mod</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase">System Ready // React Core Loaded</p>
    </div>
  );
};

export default StartScreen;