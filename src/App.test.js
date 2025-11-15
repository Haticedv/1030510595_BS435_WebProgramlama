import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Componenti (Ana Uygulama)', () => {

  test('varsayılan olarak Başlangıç Ekranını render etmeli', () => {
    render(<App />);
    const baslikElementi = screen.getByText('Oyun Modu Seçin:');
    expect(baslikElementi).toBeInTheDocument();
    const kategoriMetni = screen.queryByText(/Kategori:/i);
    expect(kategoriMetni).not.toBeInTheDocument();
  });

  test('başlat butonuna tıklandığında Oyun Ekranına geçiş yapmalı', () => {
    render(<App />);

   ByText(/Oyunu Başlat/i);
    
    fireEvent.click(baslatButonu);
    const baslikElementi = screen.queryByText('Oyun Modu Seçin:');
    expect(baslikElementi).not.toBeInTheDocument();
    const kategoriMetni = screen.getByText(/Kategori:/i);
    expect(kategoriMetni).toBeInTheDocument();
  });
  
});