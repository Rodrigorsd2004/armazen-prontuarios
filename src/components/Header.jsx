import React from 'react';
import './Styles/Header.css';

export default function Header({ onNavigateHome, onNavigateAdicionar, onNavigateListar }) {
  return (
    <header className="header-floating">
      <nav className="nav">
        <span className="nav-item" onClick={onNavigateHome}>
          Início
        </span>
        <span className="nav-item" onClick={onNavigateAdicionar}>
          Adicionar Aluno
        </span>
        <span className="nav-item" onClick={onNavigateListar}>
          Listar os Alunos
        </span>
      </nav>
    </header>
  );
}
