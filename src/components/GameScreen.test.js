import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameScreen from './GameScreen';

jest.mock('../data/imagesData', () => ([
  {
    id: 99,
    topic: 'Test Konusu',
    hint: 'Bu bir test ipucusudur.',
    images: [
      { id: 'img-real-1', src: '/test/real1.jpg', isAI: false },
      { id: 'img-ai',     src: '/test/ai.jpg',    isAI: true },  // AI 
      { id: 'img-real-2', src: '/test/real2.jpg', isAI: false }
    ]
  }
]));

jest.useFakeTimers();

describe('GameScreen Componenti (Oyun Mantığı)', () => {

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('görselleri ve puanı doğru şekilde göstermeli', () => {
    render(<GameScreen oyunModu="klasik" />);

    expect(screen.getByText('Puan:')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    const resimler = screen.getAllByRole('img');
    expect(resimler).toHaveLength(3);
  });

  test('kullanıcı AI görselini bulduğunda başarı mesajı göstermeli', () => {
    render(<GameScreen oyunModu="klasik" />);

    const aiGorseli = screen.getByAltText('img-ai');

    fireEvent.click(aiGorseli);

    expect(screen.getByText('Mükemmel! Doğru Tahmin!')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('klasik modda yanlış tahminde ipucu göstermeli', () => {
    render(<GameScreen oyunModu="klasik" />);

    const gercekGorsel = screen.getByAltText('img-real-1');

    fireEvent.click(gercekGorsel);

    expect(screen.getByText(/İpucu: Bu bir test ipucusudur/i)).toBeInTheDocument();
    expect(screen.getByText(/Son şans!/i)).toBeInTheDocument();
  });
  
});