import React from 'react';

const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M20 4L4 20L20 36L36 20L20 4Z" fill="#dc2626" opacity="0.2"/>
            <path d="M20 8L8 20L20 32L32 20L20 8Z" fill="#dc2626" opacity="0.4"/>
            <path d="M20 12L12 20L20 28L28 20L20 12Z" fill="#dc2626"/>
            <path d="M8 20H14L17 14L20 26L23 18L26 20H32" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="logo-text">
          <h1>Sistema de Laudos</h1>
          <span>Eletrocardiograma</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;