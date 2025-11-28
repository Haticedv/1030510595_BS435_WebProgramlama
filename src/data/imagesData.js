const imagesData = [
  {
    id: 1,
    topic: "Doğa Manzaraları",
    hint: "Gerçek doğa fotoğraflarında yaprakların düzensizliği ve ışık gölge detayları daha doğaldır. AI bazen su yansımalarında hata yapabilir.",
    images: [
      { id: 'img1_1', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop', isAI: false },
      { id: 'img1_2', src: 'https://images.unsplash.com/photo-1501854140884-074bf86ee90c?w=400&h=400&fit=crop', isAI: false },
      { id: 'img1_3', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', isAI: true },
    ]
  },
  {
    id: 2,
    topic: "Portreler",
    hint: "İnsan yüzlerinde cilt dokusu, saç telleri ve kulak yapısı AI için zordur. Arka plandaki bulanıklığın (bokeh) doğallığına bak.",
    images: [
      { id: 'img2_1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', isAI: false },
      { id: 'img2_2', src: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop', isAI: true },
      { id: 'img2_3', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', isAI: false },
    ]
  },
  {
    id: 3,
    topic: "Mimari",
    hint: "Bina çizgilerinin perspektife uygunluğunu kontrol et. AI bazen pencereleri veya sütunları yamuk çizebilir.",
    images: [
      { id: 'img3_1', src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=400&fit=crop', isAI: false },
      { id: 'img3_2', src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop', isAI: false },
      { id: 'img3_3', src: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=400&h=400&fit=crop', isAI: true },
    ]
  }
];

export default imagesData;