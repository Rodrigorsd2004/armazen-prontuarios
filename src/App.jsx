import React, { useState } from 'react';
import Home from './screens/Home';
import AlunoForm from './screens/AlunoForm';
import AlunoListar from './screens/AlunoListar';
import Login from './screens/LoginScreen';  // importe o login

export default function App() {
  const [tela, setTela] = useState('login');  // começa na tela de login
  const [logado, setLogado] = useState(false);

  const irParaHome = () => setTela('home');
  const irParaForm = () => setTela('form');
  const irParaListar = () => setTela('listar');

  const handleLoginSuccess = () => {
    setLogado(true);
    setTela('home');
  };

  if (!logado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

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
