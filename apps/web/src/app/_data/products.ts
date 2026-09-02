export interface Product {
  id: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  distance: string;
  symbol: string;

  description: string;
  availability: string;
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
    description:
      'Uma seleção de legumes e verduras frescos produzidos por agricultores locais.',
    availability: 'Retirada disponível hoje',
  },
  {
    id: 'pao-artesanal',
    name: 'Pão de fermentação natural',
    seller: 'Pão da Esquina',
    category: 'Padaria',
    price: 18,
    distance: '1,2 km',
    symbol: '🍞',
    description:
      'Pão artesanal preparado com fermentação natural e ingredientes selecionados.',
    availability: 'Produção diária sob encomenda',
  },
  {
    id: 'marmita-caseira',
    name: 'Marmita caseira',
    seller: 'Cozinha da Ana',
    category: 'Refeições',
    price: 24.9,
    distance: '650 m',
    symbol: '🍛',
    description: 'Refeição caseira preparada diariamente com ingredientes frescos.',
    availability: 'Disponível para retirada no almoço',
  },
  {
    id: 'cafe-especial',
    name: 'Café especial local',
    seller: 'Torra do Bairro',
    category: 'Padaria',
    price: 36,
    distance: '2 km',
    symbol: '☕',
    description:
      'Café especial torrado localmente, com aroma intenso e notas de chocolate.',
    availability: 'Disponível para retirada',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

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
