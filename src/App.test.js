import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./firebaseConfig', () => ({
  db: {}
}), { virtual: true });

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getFirestore: jest.fn()
}));

jest.mock('./data/imagesData', () => ([
  {
    id: 99,
    topic: 'Test Konusu',
    hint: 'Test İpucu',
    images: []
  }
]));

describe('App Componenti', () => {

  test('varsayılan olarak Başlangıç Ekranını render etmeli', () => {
    render(<App />);
    
    const baslikElementi = screen.getByText(/AI vs Gerçek/i);
    expect(baslikElementi).toBeInTheDocument();
    
    const puanMetni = screen.queryByText(/Puan:/i);
    expect(puanMetni).not.toBeInTheDocument();
  });

  test('Mod butonuna tıklandığında Oyun Ekranına geçiş yapmalı', () => {
    render(<App />);

    const modButonu = screen.getByRole('button', { name: /Klasik Mod/i });
    fireEvent.click(modButonu);
    
    const puanMetni = screen.getByText(/Puan:/i);
    expect(puanMetni).toBeInTheDocument();
  });
  
});