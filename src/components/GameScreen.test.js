import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameScreen from './GameScreen';

jest.mock('../firebaseConfig', () => ({
  db: {}
}), { virtual: true });

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getFirestore: jest.fn()
}));

jest.mock('../data/imagesData', () => ([
  {
    id: 99,
    topic: 'Test Konusu',
    hint: 'Bu bir test ipucusudur.',
    images: [
      { id: 'img-gercek-1', src: '/test/gercek1.jpg', isAI: false }, 
      { id: 'img-ai',       src: '/test/ai.jpg',      isAI: true }, 
      { id: 'img-gercek-2', src: '/test/gercek2.jpg', isAI: false } 
    ]
  }
]));

describe('GameScreen Componenti', () => {

  test('Puan, konu başlığı ve resimler doğru yükleniyor mu', () => {
    render(<GameScreen oyunModu="klasik" oyunBitince={() => {}} />);

    expect(screen.getByText(/Puan:/i)).toBeInTheDocument();
    expect(screen.getByText('Test Konusu')).toBeInTheDocument();

    const resimler = screen.getAllByRole('img');
    expect(resimler).toHaveLength(3);
  });

  test('Doğru tahmin (AI) yapıldığında başarı mesajı çıkmalı', async () => {
    render(<GameScreen oyunModu="klasik" oyunBitince={() => {}} />);

    const resimler = screen.getAllByRole('img');
    fireEvent.click(resimler[1]);

    await waitFor(() => {
        expect(screen.getByText(/Mükemmel!/i)).toBeInTheDocument();
    });
  });

  test('Klasik modda yanlış tahminde ipucu çıkmalı', async () => {
    render(<GameScreen oyunModu="klasik" oyunBitince={() => {}} />);

    const resimler = screen.getAllByRole('img');
    fireEvent.click(resimler[0]);

    await waitFor(() => {
        expect(screen.getByText(/Hata!/i)).toBeInTheDocument();
    });
  });
  
});