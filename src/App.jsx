import React, { useState } from 'react';
import Home from './screens/Home';
import AlunoForm from './screens/AlunoForm';
import AlunoListar from './screens/AlunoListar';

export default function App() {
  const [tela, setTela] = useState('home');

  const irParaHome = () => setTela('home');
  const irParaForm = () => setTela('form');
  const irParaListar = () => setTela('listar');

  return (
    <div>
      {tela === 'home' && (
        <Home
          onNavigateHome={irParaHome}
          onNavigateAdicionar={irParaForm}
          onNavigateListar={irParaListar}
        />
      )}
      {tela === 'form' && (
        <AlunoForm
          onVoltar={irParaHome}
          onNavigateAdicionar={irParaForm}
          onNavigateListar={irParaListar}
        />
      )}
      {tela === 'listar' && (
        <AlunoListar
          onVoltar={irParaHome}
          onNavigateAdicionar={irParaForm}
          onNavigateListar={irParaListar}
        />
      )}
    </div>
  );
}
