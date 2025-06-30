import React, { useState } from 'react';
import { contaValida } from '../utils/validarConta';
import { FaUser, FaLock } from 'react-icons/fa';
import './styles/LoginScreen.css';
import inicial from '../assets/inicial.png';

export default function Login({ onLoginSuccess }) {
  const [prontuario, setProntuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      prontuario.trim() === contaValida.prontuario &&
      senha.trim() === contaValida.senha
    ) {
      setErro('');
      onLoginSuccess();
    } else {
      setErro('Prontuário ou senha incorretos');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="preview-panel">
        <img src={inicial} alt="Preview do site" />
      </div>

      <div className="login-panel">
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <h2>Bem-vindo</h2>

          <div className="input-icon-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Login"
              value={prontuario}
              onChange={(e) => setProntuario(e.target.value)}
              required
              autoFocus
              className="login-input"
              autoComplete="username"
            />
          </div>

          <div className="input-icon-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="login-input"
              autoComplete="current-password"
            />
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}
