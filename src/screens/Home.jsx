import React from 'react';
import './styles/Home.css';
import Header from '../components/Header';

export default function Home({
  onNavigateHome,
  onNavigateAdicionar,
  onNavigateListar,
}) {
  return (
    <main className="home-container">
      <Header
        onNavigateHome={onNavigateHome}
        onNavigateAdicionar={onNavigateAdicionar}
        onNavigateListar={onNavigateListar}
      />
      <section className="home-card">
        <h1>Prontuário Escolar - Ernestina Nogueira César</h1>
        <p className="subtitle">
          Gerencie os cadastros de alunos de forma simples e eficiente.
        </p>
        <div className="button-group">
          <button className="btn primary" onClick={onNavigateAdicionar}>
            Adicionar Aluno
          </button>
          <button className="btn secondary" onClick={onNavigateListar}>
            Listar Alunos
          </button>
        </div>
      </section>
    </main>
  );
}
