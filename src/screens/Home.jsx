import React from 'react';
import './styles/Home.css';
import Header from '../components/Header';
import BackgroundParallax from '../components/BackgroundParallax'; // importe aqui

export default function Home({
  onNavigateHome,
  onNavigateAdicionar,
  onNavigateListar,
}) {
  return (
    <>
      <BackgroundParallax imageUrl="https://images.unsplash.com/photo-1750099255888-91d5386e833c?q=80&w=870&auto=format&fit=crop" />
      <main className="home-container" style={{ position: 'relative', zIndex: 1 }}>
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
    </>
  );
}
