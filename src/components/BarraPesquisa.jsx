import React from "react";
import "./Styles/BarraPesquisa.css";

export default function BarraPesquisa({ valor, onChange }) {
  const handleChange = (e) => {
    let input = e.target.value.toUpperCase();

    // Detecta se é RA: só números e possível letra no final, SEM espaços nem caracteres especiais
    const isPotentialRA = /^[0-9]*[A-Z]?$/.test(input.replace("-", ""));

    if (isPotentialRA) {
      // Remove hífen para processar
      let cleaned = input.replace(/-/g, "");

      if (cleaned.length <= 9) {
        // Só números até 9 dígitos
        onChange(cleaned);
      } else if (cleaned.length === 10) {
        // 9 números + 1 letra no final, insere hífen automaticamente
        const numbers = cleaned.slice(0, 9);
        const letter = cleaned.slice(9);
        onChange(`${numbers}-${letter}`);
      } else {
        // Limite atingido, mantém valor antigo
        onChange(valor);
      }
    } else {
      // É nome, deixa livre, permite espaços e tudo
      onChange(input);
    }
  };

  return (
    <div className="barra-pesquisa-container">
      <input
        type="text"
        placeholder="🔍 Pesquisar por nome ou RA..."
        value={valor}
        onChange={handleChange}
      />
    </div>
  );
}
