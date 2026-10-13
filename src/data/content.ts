import { Mic, Sliders, Gauge, Music } from 'lucide-react';

export const services = [
  {
    id: 'registrazione',
    title: 'Registrazione',
    subtitle: 'Tracking voci e strumenti',
    icon: Mic,
    description:
      'Cattura ogni sfumatura con ambienti trattati acusticamente e catene microfoniche di altissima qualità. Tracking vocale e strumentale con monitoraggio a latenza zero per performance naturali e impeccabili.',
    features: ['Tracking vocale', 'Registrazione strumenti', 'Monitoraggio latenza zero', 'Doppie e sovraincisioni'],
  },
  {
    id: 'mixing',
    title: 'Mixing',
    subtitle: 'Analogico & Digitale',
    icon: Sliders,
    description:
      'Un mix ibrido che unisce il calore dell\'analogico alla precisione del digitale. Equalizzazione, dinamica e spazialità curate al dettaglio per dare profondità, impatto e definizione a ogni elemento del brano.',
    features: ['Workflow analogico/digitale', 'Equalizzazione e dinamica', 'Spazialità e panorama', 'Automazioni'],
  },
  {
    id: 'mastering',
    title: 'Mastering',
    subtitle: 'Streaming e supporto fisico',
    icon: Gauge,
    description:
      'Il tocco finale: loudness ottimizzato per ogni piattaforma di distribuzione, coerenza timbrica su tutti i sistemi di ascolto e traduzione perfetta da cuffie a sistemi Hi-Fi. Master per streaming, CD e vinile.',
    features: ['Master per streaming (LUFS)', 'Master per CD e vinile', 'Compatibilità multi-sistema', 'Dithering e finalizzazione'],
  },
  {
    id: 'produzione',
    title: 'Produzione & Consulenza',
    subtitle: 'Direzione artistica e tecnica',
    icon: Music,
    description:
      'Consulenza a 360 gradi: dalla pre-produzione all\'arrangiamento, dalla scelta dei suoni alla direzione artistica. Supporto completo per portare la tua visione dal demo al prodotto finito con coerenza e identità.',
    features: ['Pre-produzione', 'Arrangiamenti', 'Sound design', 'Direzione artistica'],
  },
];

export type Track = {
  id: number;
  title: string;
  artist: string;
  genre: 'Hip Hop' | 'Pop' | 'Rock' | 'Mix & Mastering';
  service: string;
  cover: string;
  audioBefore: string;
  audioAfter: string;
  description?: string;
};

// Real royalty-free audio clips (SoundHelix CC-BY)
export const tracks: Track[] = [
  {
    id: 0,
    title: 'In The End',
    artist: 'Linkin Park',
    genre: 'Rock',
    service: 'Mix & Mastering',
    cover:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Linkin%20Park%20In%20The%20End%20album%20cover%20art%2C%20dark%20dramatic%20moody%20atmosphere%2C%20piano%20keys%20silhouette%2C%20rain%2C%20cinematic%20lighting%2C%20dark%20blue%20and%20black%20color%20scheme%2C%20professional%20music%20cover%2C%20high%20contrast%2C%20emotional&image_size=square',
    audioBefore: '/images/MUSIC/Linkin%20Park-In%20The%20End%20MIX%20FINAL.mp3',
    audioAfter: '/images/MUSIC/Linkin%20Park-In%20The%20End%20MIX%20FINAL.mp3',
    description:
      'Mix e mastering realizzati partendo dalle raw tracks originali.',
  },
  {
    id: 1,
    title: 'Notte di Mezza Estate',
    artist: 'Marco Venanzi',
    genre: 'Pop',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/8168570/pexels-photo-8168570.png?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Strade Buias',
    artist: 'Greta Falchi',
    genre: 'Hip Hop',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/8168567/pexels-photo-8168567.png?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Static Noise',
    artist: 'The Overdrive',
    genre: 'Rock',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/33418891/pexels-photo-33418891.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    title: 'Luce Liquida',
    artist: 'Aurora Mei',
    genre: 'Pop',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/3109821/pexels-photo-3109821.png?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 5,
    title: 'Boom Bap Theory',
    artist: 'Tono Libero',
    genre: 'Hip Hop',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/18535941/pexels-photo-18535941.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 6,
    title: 'Reverb Nation',
    artist: 'Chris Damiani',
    genre: 'Rock',
    service: 'Mix & Mastering',
    cover: 'https://images.pexels.com/photos/33418895/pexels-photo-33418895.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    audioBefore: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6-raw.mp3',
    audioAfter: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];

export const gear = [
  {
    category: 'Interfaccia Audio',
    items: [{ name: 'Audient EVO 16', detail: '24-bit / 96kHz — 8 preamp EVE' }],
  },
  {
    category: 'Monitoraggio',
    items: [{ name: 'Yamaha HS7', detail: 'Monitor near-field bi-amped' }],
  },
  {
    category: 'Gestione Cuffie',
    items: [{ name: 'Mackie HM-400', detail: 'Distributore cuffie 4 canali' }],
  },
  {
    category: 'Microfoni',
    items: [{ name: 'R\u00d8DE NT2-A', detail: 'Condensatore a diaframma grande — multi-pattern' }],
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Marco Venanzi',
    service: 'Mix & Mastering',
    rating: 5,
    text: 'Ho portato un demo grezzo e ho ricevuto un prodotto pronto per lo streaming. Il mix ha dato corpo e definizione alla mia voce che non avevo mai sentito prima. Professionalismo assoluto.',
  },
  {
    id: 2,
    name: 'Greta Falchi',
    service: 'Registrazione & Mix',
    rating: 5,
    text: 'Ambiente confortevole, monitoraggio a latenza zero impeccabile. Mi sono sentita a casa dal primo take. Il risultato finale supera le aspettative che avevo all\'inizio del progetto.',
  },
  {
    id: 3,
    name: 'The Overdrive',
    service: 'Mastering',
    rating: 5,
    text: 'Avevamo un mix già buono ma il mastering lo ha portato a un livello professionale. Traduzione perfetta su ogni sistema di ascolto, dalle cuffie allo stereo dell\'auto. Consigliatissimo.',
  },
  {
    id: 4,
    name: 'Aurora Mei',
    service: 'Produzione & Consulenza',
    rating: 5,
    text: 'La direzione artistica ha trasformato le mie idee confuse in un brano con identità forte. Dal sound design all\'arrangiamento, ogni scelta aveva un senso. Tornerò sicuramente.',
  },
  {
    id: 5,
    name: 'Tono Libero',
    service: 'Mix & Mastering',
    rating: 5,
    text: 'Il workflow ibrido analogico-digitale fa la differenza. Il mio brano hip hop ha guadagnato profondità, punch e chiarezza. Comunicazione chiara e tempi di consegna rispettati.',
  },
  {
    id: 6,
    name: 'Chris Damiani',
    service: 'Registrazione & Mastering',
    rating: 5,
    text: 'Catena microfonica di altissima qualità. La mia voce non era mai suonata così definita. Master per streaming perfetto, loudness ottimizzato su tutte le piattaforme.',
  },
  {
    id: 7,
    name: 'Luna Ferri',
    service: 'Mix & Mastering',
    rating: 5,
    text: 'Sono partita con un progetto casalingo e ho chiuso con un singolo che suona come un disco. L\'attenzione al dettaglio è maniacale, dal EQ alla spazialità. Servizio top.',
  },
];

export const filters = ['Tutti', 'Hip Hop', 'Pop', 'Rock'] as const;
