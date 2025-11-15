
const imagesData = [
    {
      id: 1,
      topic: "Doğa Manzaraları",
      hint: "Yapay zeka su yansımalarını ve ışık gölge detaylarını bazen karıştırabilir.",
      images: [
   
        { id: 'doga_1', src: '/img/doga_gercek1.jpg', isAI: false },
        { id: 'doga_2', src: '/img/doga_gercek2.jpg', isAI: false },
        { id: 'doga_3', src: '/img/doga_gercek3.jpg', isAI: false }, 
        { id: 'doga_4', src: '/img/doga_gercek4.jpg', isAI: false },
     
        { id: 'doga_ai_1', src: '/img/doga_ai.jpg', isAI: true },
        { id: 'doga_ai_2', src: '/img/doga_ai2.jpg', isAI: true },
      ]
    },

    {
      id: 2,
      topic: "İnsan Yüzleri",
      hint: "Kulak yapısına ve saç tellerine dikkat et. AI genelde simetri hatası yapar.",
      images: [
     
        { id: 'yuz_1', src: '/img/yuz_gercek1.jpg', isAI: false },
        { id: 'yuz_2', src: '/img/yuz_gercek2.jpg', isAI: false },
        { id: 'yuz_3', src: '/img/yuz_gercek3.jpg', isAI: false }, 
        { id: 'yuz_4', src: '/img/yuz_gercek4.jpg', isAI: false }, 

        { id: 'yuz_ai_1', src: '/img/yuz_ai1.jpg', isAI: true },
        { id: 'yuz_ai_2', src: '/img/yuz_ai2.jpg', isAI: true }, 
      ]
    },
  
    
    {
      id: 3,
      topic: "Modern Mimari",
      hint: "Perspektif çizgilerine bak. Pencereler veya sütunlar yamuk olabilir.",
      images: [
      
        { id: 'bina_1', src: '/img/mimari_gercek1.jpg', isAI: false },
        { id: 'bina_2', src: '/img/mimari_gercek2.jpg', isAI: false },
        { id: 'bina_3', src: '/img/mimari_gercek3.jpg', isAI: false }, 
        { id: 'bina_4', src: '/img/mimari_gercek4.jpg', isAI: false },

        { id: 'bina_ai_1', src: '/img/mimari_ai.jpg', isAI: true },
        { id: 'bina_ai_2', src: '/img/mimari_ai2.jpg', isAI: true },
      ]
    }
  ];
  
  export default imagesData;