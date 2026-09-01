import Link from 'next/link';
import styles from './site-header.module.scss';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`page-container ${styles.container}`}>
        <Link className={styles.logo} href="/">
          <span className={styles.logoMark} aria-hidden="true">
            MH
          </span>

          <span>
            Marketplace
            <small>Hiperlocal</small>
          </span>
        </Link>

        <nav className={styles.navigation} aria-label="Navegação principal">
          <Link href="/">Início</Link>
          <Link href="/buscar">Explorar</Link>
          <Link href="/#vender">Quero vender</Link>
        </nav>

        <Link className={styles.action} href="/buscar">
          Buscar no bairro
        </Link>
      </div>
    </header>
  );
}
