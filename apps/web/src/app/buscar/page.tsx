import type { Metadata } from 'next';
import Link from 'next/link';
import { formatPrice, normalizeSearch, products } from '../_data/products';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Encontre produtos e comércios próximos.',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';
  const normalizedQuery = normalizeSearch(query);

  const results = products.filter((product) => {
    const searchableText = normalizeSearch(`${product.name} ${product.seller} ${product.category}`);

    return !normalizedQuery || searchableText.includes(normalizedQuery);
  });

  return (
    <main className={`page-container ${styles.page}`}>
      <Link className={styles.back} href="/">
        ← Voltar ao início
      </Link>

      <header className={styles.header}>
        <span>Explore o bairro</span>
        <h1>Encontre algo perto de você.</h1>

        <form className={styles.search} action="/buscar" method="get">
          <input
            aria-label="Buscar produtos ou lojas"
            defaultValue={query}
            name="q"
            placeholder="Produto, loja ou categoria"
            type="search"
          />

          <button type="submit">Buscar</button>
        </form>
      </header>

      <section aria-labelledby="results-title">
        <div className={styles.resultsHeader}>
          <h2 id="results-title">{query ? `Resultados para “${query}”` : 'Todos os produtos'}</h2>

          <span>
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((product) => (
              <article className={styles.card} key={product.id}>
                <div className={styles.image} aria-hidden="true">
                  {product.symbol}
                </div>

                <div className={styles.cardContent}>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.seller}</p>

                  <div className={styles.cardFooter}>
                    <strong>{formatPrice(product.price)}</strong>
                    <small>{product.distance}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span aria-hidden="true">🔎</span>
            <h2>Nada encontrado</h2>
            <p>Tente buscar outro produto, loja ou categoria.</p>
            <Link href="/buscar">Limpar busca</Link>
          </div>
        )}
      </section>
    </main>
  );
}
