import React from "react";
import "./Styles/ConfirmModal.css";
import { verificarSenha } from "../utils/verificaSenha";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  const [senha, setSenha] = React.useState("");
  const [erro, setErro] = React.useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!verificarSenha(senha)) {
      setErro("Senha incorreta. Tente novamente.");
      return;
    }
    setErro("");
    onConfirm(); // Executa a exclusão se senha estiver correta
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Confirmar Exclusão</h2>
        <p>Digite a senha para confirmar:</p>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="erro-senha">{erro}</p>}
        <div className="confirm-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
