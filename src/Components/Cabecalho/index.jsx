// \src\Components\index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './cabecalho.module.css'; // Importe o arquivo CSS para estilização

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoItem}>
          <span role="img" aria-label="app" className={styles.emoji}>🤖</span> {/* Emoji representando o aplicativo */}
      </div>
      <div className={styles.sidebarItem}>
        <Link to="/image-generator">
          <span role="img" aria-label="image-generator" className={styles.emoji}>🖼️</span> {/* Emoji representando o gerador de imagem */}
        </Link>
      </div>
      <div className={styles.sidebarItem}>
        <Link to="/translator">
          <span role="img" aria-label="translator" className={styles.emoji}>🌐</span> {/* Emoji representando o tradutor */}
        </Link>
      </div>
      <div className={styles.sidebarItem}>
        <Link to="/code-optimizer">
          <span role="img" aria-label="code-optimizer" className={styles.emoji}>🔧</span> {/* Emoji representando o otimizador de código */}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
