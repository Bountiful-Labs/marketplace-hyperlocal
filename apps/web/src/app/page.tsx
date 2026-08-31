import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={`page-container ${styles.container}`}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              Compras locais, menos distância
            </span>

            <h1>Tudo do bairro, bem mais perto.</h1>

            <p className={styles.description}>
              Descubra produtos, serviços e pequenos negócios da sua região
              em um só lugar.
            </p>

            <form className={styles.search} action="/buscar" method="get">
              <input
                aria-label="Buscar produtos, serviços ou lojas"
                name="q"
                placeholder="O que você procura?"
                type="search"
              />

              <button type="submit">Buscar</button>
            </form>

            <ul
              className={styles.trustList}
              aria-label="Vantagens da plataforma"
            >
              <li>Negócios locais</li>
              <li>Retirada perto</li>
              <li>Compra simples</li>
            </ul>
          </div>

          <aside
            className={styles.showcase}
            aria-label="Destaque da comunidade"
          >
            <span>Produtos perto de você</span>

            <div className={styles.illustration} aria-hidden="true">
              <span>🥖</span>
              <span>🥬</span>
              <span>☕</span>
            </div>

            <h2>Mais bairro em cada compra.</h2>

            <p>
              Valorize quem produz, vende e trabalha ao seu redor.
            </p>

            <div className={styles.metric}>
              <small>Raio inicial</small>
              <strong>até 5 km</strong>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
