// src/components/BarraPesquisa.jsx
import React from "react";
import "./styles/BarraPesquisa.css";

export default function BarraPesquisa({ valor, onChange }) {
  return (
    <div className="barra-pesquisa-container">
      <input
        type="text"
        placeholder="🔍 Pesquisar por nome ou RA..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
