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
    render(<StartScreen oyunuBaslat={() => {}} />);

    const baslikElementi = screen.getByRole('heading', { level: 1 });
    expect(baslikElementi).toBeInTheDocument(); 

    const klasikButon = screen.getByRole('button', { name: /Klasik Mod/i });
    expect(klasikButon).toBeInTheDocument();
    
    const sureliButon = screen.getByRole('button', { name: /Süreli Mod/i });
    expect(sureliButon).toBeInTheDocument();
  });

  test('Klasik Mod butonuna tıklandığında prop fonksiyonunu çağırmalı', () => {
    const mockOyunuBaslat = jest.fn(); 

    render(<StartScreen oyunuBaslat={mockOyunuBaslat} />);
    
    const klasikButon = screen.getByRole('button', { name: /Klasik Mod/i });
    
    fireEvent.click(klasikButon);

    expect(mockOyunuBaslat).toHaveBeenCalledTimes(1);
    expect(mockOyunuBaslat).toHaveBeenCalledWith(OYUN_MODLARI.KLASIK);
  });
  
});