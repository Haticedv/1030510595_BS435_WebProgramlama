import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import StartScreen from './StartScreen';

const OYUN_MODLARI = {
  KLASIK: 'klasik',
  SURELI: 'sureli_mod'
};


describe('StartScreen Componenti', () => {

  test('başlığı ve oyun modu seçeneklerini doğru render etmeli', () => {
   
    render(
      <StartScreen 
        oyunuBaslat={() => {}} 
        oyunModlari={OYUN_MODLARI} 
      />
    );

    const baslikElementi = screen.getByText('AI Tahmin Oyunu');
    expect(baslikElementi).toBeInTheDocument(); 

    const klasikModLabel = screen.getByText(/Klasik Mod/i);
    expect(klasikModLabel).toBeInTheDocument();
  });


 
  test('başlat butonuna tıklandığında prop fonksiyonunu çağırmalı', () => {
    const mockOyunuBaslat = jest.fn();

    render(
      <StartScreen 
        oyunuBaslat={mockOyunuBaslat} 
        oyunModlari={OYUN_MODLARI} 
      />
    );

    
    const baslatButonu = screen.getByText(/Oyunu Başlat/i);
    
    fireEvent.click(baslatButonu);

    expect(mockOyunuBaslat).toHaveBeenCalledTimes(1);
    
    expect(mockOyunuBaslat).toHaveBeenCalledWith(OYUN_MODLARI.KLASIK);
  });
  
});