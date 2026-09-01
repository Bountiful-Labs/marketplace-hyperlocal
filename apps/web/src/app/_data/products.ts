export interface Product {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  distance: string;
  symbol: string;
}

export const products: Product[] = [
  {
    id: 'cesta-da-semana',
    name: 'Cesta da semana',
    seller: 'Horta da Vila',
    category: 'Hortifruti',
    price: 42.9,
    distance: '800 m',
    symbol: '🥕',
  },
  {
    id: 'pao-artesanal',
    name: 'Pão de fermentação natural',
    seller: 'Pão da Esquina',
    category: 'Padaria',
    price: 18,
    distance: '1,2 km',
    symbol: '🍞',
  },
  {
    id: 'marmita-caseira',
    name: 'Marmita caseira',
    seller: 'Cozinha da Ana',
    category: 'Refeições',
    price: 24.9,
    distance: '650 m',
    symbol: '🍛',
  },
  {
    id: 'cafe-especial',
    name: 'Café especial local',
    seller: 'Torra do Bairro',
    category: 'Padaria',
    price: 36,
    distance: '2 km',
    symbol: '☕',
  },
];

export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('pt-BR');
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
