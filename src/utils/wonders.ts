
export type WonderType = 'ancient' | 'new';

export interface Wonder {
  id: number;
  name: string;
  type: WonderType;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  antipode: {
    latitude: number;
    longitude: number;
    description: string;
  };
  description: string;
  shortDescription: string;
  imagePlaceholder?: string;
}

export const wonders: Wonder[] = [
  // Ancient Wonders
  {
    id: 1,
    name: "Great Pyramid of Giza",
    type: "ancient",
    location: {
      name: "Giza, Egypt",
      latitude: 29.9792,
      longitude: 31.1342
    },
    antipode: {
      latitude: -29.9792,
      longitude: -148.8658,
      description: "South Pacific Ocean, east of New Zealand"
    },
    description: "The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.",
    shortDescription: "The oldest and only surviving ancient wonder, built as a tomb for Pharaoh Khufu."
  },
  {
    id: 2,
    name: "Hanging Gardens of Babylon",
    type: "ancient",
    location: {
      name: "Near Hillah, Iraq",
      latitude: 32.5421,
      longitude: 44.4210
    },
    antipode: {
      latitude: -32.5421,
      longitude: -135.5790,
      description: "South Pacific Ocean, northeast of Easter Island"
    },
    description: "The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World. They were described as a remarkable feat of engineering with an ascending series of tiered gardens containing a wide variety of trees, shrubs, and vines.",
    shortDescription: "Legendary terraced gardens that may have been created by King Nebuchadnezzar II for his wife."
  },
  {
    id: 3,
    name: "Statue of Zeus at Olympia",
    type: "ancient",
    location: {
      name: "Olympia, Greece",
      latitude: 37.6379,
      longitude: 21.6300
    },
    antipode: {
      latitude: -37.6379,
      longitude: -158.3700,
      description: "South Pacific Ocean, south of Hawaii"
    },
    description: "The Statue of Zeus at Olympia was a giant seated figure, about 13 m tall, made by the Greek sculptor Phidias around 435 BC at the sanctuary of Olympia, Greece, and erected in the Temple of Zeus there.",
    shortDescription: "A monumental statue of Zeus, king of the Greek gods, made of ivory and gold."
  },
  {
    id: 4,
    name: "Temple of Artemis at Ephesus",
    type: "ancient",
    location: {
      name: "Near Selçuk, Turkey",
      latitude: 37.9490,
      longitude: 27.3639
    },
    antipode: {
      latitude: -37.9490,
      longitude: -152.6361,
      description: "South Pacific Ocean, southeast of Hawaii"
    },
    description: "The Temple of Artemis was a Greek temple dedicated to the goddess Artemis. It was located in Ephesus (near the modern town of Selçuk in present-day Turkey) and was completely rebuilt three times before its final destruction in 401 AD.",
    shortDescription: "A Greek temple dedicated to Artemis, rebuilt several times before its final destruction."
  },
  {
    id: 5,
    name: "Mausoleum at Halicarnassus",
    type: "ancient",
    location: {
      name: "Bodrum, Turkey",
      latitude: 37.0380,
      longitude: 27.4241
    },
    antipode: {
      latitude: -37.0380,
      longitude: -152.5759,
      description: "South Pacific Ocean, southeast of Hawaii"
    },
    description: "The Mausoleum at Halicarnassus was a tomb built between 353 and 350 BC at Halicarnassus (present Bodrum, Turkey) for Mausolus, a satrap in the Persian Empire, and his sister-wife Artemisia II of Caria.",
    shortDescription: "An elaborate tomb built for Mausolus, a Persian satrap, and his wife Artemisia."
  },
  {
    id: 6,
    name: "Colossus of Rhodes",
    type: "ancient",
    location: {
      name: "Rhodes, Greece",
      latitude: 36.4510,
      longitude: 28.2278
    },
    antipode: {
      latitude: -36.4510,
      longitude: -151.7722,
      description: "South Pacific Ocean, southeast of Hawaii"
    },
    description: "The Colossus of Rhodes was a statue of the Greek sun-god Helios, erected in the city of Rhodes, on the Greek island of the same name, by Chares of Lindos in 280 BC.",
    shortDescription: "A massive statue of the Greek god Helios that stood over 30 meters tall."
  },
  {
    id: 7,
    name: "Lighthouse of Alexandria",
    type: "ancient",
    location: {
      name: "Alexandria, Egypt",
      latitude: 31.2140,
      longitude: 29.8850
    },
    antipode: {
      latitude: -31.2140,
      longitude: -150.1150,
      description: "South Pacific Ocean, east of New Zealand"
    },
    description: "The Lighthouse of Alexandria, sometimes called the Pharos of Alexandria, was a lighthouse built by the Ptolemaic Kingdom, during the reign of Ptolemy II Philadelphus (280–247 BC). It was one of the tallest man-made structures in the world for many centuries.",
    shortDescription: "One of the tallest structures of the ancient world, guiding sailors into Alexandria's harbor."
  },

  // New Wonders
  {
    id: 8,
    name: "Great Wall of China",
    type: "new",
    location: {
      name: "Near Beijing, China",
      latitude: 40.4319,
      longitude: 116.5704
    },
    antipode: {
      latitude: -40.4319,
      longitude: -63.4296,
      description: "Southern Atlantic Ocean, east of Falklands"
    },
    description: "The Great Wall of China is a series of fortifications built along the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.",
    shortDescription: "A 13,000+ mile fortification built across northern China, spanning over 2,000 years of construction."
  },
  {
    id: 9,
    name: "Petra",
    type: "new",
    location: {
      name: "Ma'an, Jordan",
      latitude: 30.3285,
      longitude: 35.4444
    },
    antipode: {
      latitude: -30.3285,
      longitude: -144.5556,
      description: "South Pacific Ocean, east of New Zealand"
    },
    description: "Petra is a historical and archaeological city in southern Jordan. It is adjacent to the mountain of Jabal Al-Madbah, in a basin surrounded by mountains forming the eastern flank of the Arabah valley running from the Dead Sea to the Gulf of Aqaba.",
    shortDescription: "An ancient city carved into pink sandstone cliffs, established around 312 BCE."
  },
  {
    id: 10,
    name: "Christ the Redeemer",
    type: "new",
    location: {
      name: "Rio de Janeiro, Brazil",
      latitude: -22.9519,
      longitude: -43.2105
    },
    antipode: {
      latitude: 22.9519,
      longitude: 136.7895,
      description: "Northwest Pacific Ocean, southwest of Minamitorishima"
    },
    description: "Christ the Redeemer is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa, in collaboration with French engineer Albert Caquot.",
    shortDescription: "A 30-meter tall Art Deco statue of Jesus Christ overlooking Rio de Janeiro."
  },
  {
    id: 11,
    name: "Machu Picchu",
    type: "new",
    location: {
      name: "Cusco Region, Peru",
      latitude: -13.1631,
      longitude: -72.5450
    },
    antipode: {
      latitude: 13.1631,
      longitude: 107.4550,
      description: "South China Sea, southeast of Vietnam"
    },
    description: "Machu Picchu is a 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru, on a 2,430-metre (7,970 ft) mountain ridge. It was most likely built as an estate for the Inca emperor Pachacuti (1438–1472).",
    shortDescription: "A 15th-century Incan citadel set high in the Andes Mountains, showing remarkable engineering."
  },
  {
    id: 12,
    name: "Chichen Itza",
    type: "new",
    location: {
      name: "Yucatán, Mexico",
      latitude: 20.6843,
      longitude: -88.5678
    },
    antipode: {
      latitude: -20.6843,
      longitude: 91.4322,
      description: "Indian Ocean, southwest of Andaman Islands"
    },
    description: "Chichen Itza was a large pre-Columbian city built by the Maya people of the Terminal Classic period. The archaeological site is located in Tinúm Municipality, Yucatán State, Mexico.",
    shortDescription: "A massive Maya city featuring the pyramid of Kukulcan, built between 800-900 CE."
  },
  {
    id: 13,
    name: "Colosseum",
    type: "new",
    location: {
      name: "Rome, Italy",
      latitude: 41.8902,
      longitude: 12.4922
    },
    antipode: {
      latitude: -41.8902,
      longitude: -167.5078,
      description: "South Pacific Ocean, southwest of Tonga"
    },
    description: "The Colosseum, also known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy. Built of travertine limestone, tuff, and brick-faced concrete, it was the largest amphitheatre ever built at the time and held 50,000 to 80,000 spectators.",
    shortDescription: "An iconic oval amphitheater in Rome, completed around 80 CE, used for gladiatorial contests."
  },
  {
    id: 14,
    name: "Taj Mahal",
    type: "new",
    location: {
      name: "Agra, India",
      latitude: 27.1751,
      longitude: 78.0421
    },
    antipode: {
      latitude: -27.1751,
      longitude: -101.9579,
      description: "South Pacific Ocean, northwest of Easter Island"
    },
    description: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor, Shah Jahan, to house the tomb of his favourite wife, Mumtaz Mahal.",
    shortDescription: "An ivory-white marble mausoleum built by Emperor Shah Jahan in memory of his wife."
  }
];

export const getAncientWonders = () => wonders.filter(wonder => wonder.type === 'ancient');
export const getNewWonders = () => wonders.filter(wonder => wonder.type === 'new');

export function getWonderById(id: number): Wonder | undefined {
  return wonders.find(wonder => wonder.id === id);
}

export function getHumanReadableCoordinates(lat: number, lng: number): string {
  const latDirection = lat >= 0 ? 'N' : 'S';
  const lngDirection = lng >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(4)}° ${latDirection}, ${Math.abs(lng).toFixed(4)}° ${lngDirection}`;
}
