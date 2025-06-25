import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalProntuario from "../components/ModalProntuario";
import BarraPesquisa from "../components/BarraPesquisa";
import "./styles/AlunoListar.css";

export default function AlunoListar({
  onVoltar,
  onNavigateAdicionar,
  onNavigateListar,
}) {
  const [alunos, setAlunos] = useState([]); // sempre array inicial
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState(""); // Estado para filtro

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/alunos`)
      .then((res) => res.json())
      .then((data) => setAlunos(data ?? [])) // protege caso data seja null/undefined
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  // Filtro em tempo real com proteção para alunos indefinido
  const alunosFiltrados = (alunos || []).filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      aluno.ra?.toString().includes(filtro)
  );

  // Atualiza aluno na lista após edição ou exclusão
  const atualizarAluno = (alunoAtualizado) => {
    if (!alunoAtualizado) {
      // Caso o aluno tenha sido excluído, remove da lista
      setAlunos((prev) => prev.filter((a) => a.id !== alunoSelecionado?.id));
    } else {
      // Atualiza dados do aluno editado
      setAlunos((prev) =>
        prev.map((a) => (a.id === alunoAtualizado.id ? alunoAtualizado : a))
      );
    }
    setAlunoSelecionado(null); // fecha modal sempre que atualiza/exclui
  };

  return (
    <div className="aluno-listar-container">
      <Header
        onNavigateHome={onVoltar}
        onNavigateAdicionar={onNavigateAdicionar}
        onNavigateListar={onNavigateListar}
      />
      <h1 className="titulo-listagem">Listagem de Alunos</h1>
      <BarraPesquisa valor={filtro} onChange={setFiltro} />
      <div className="container-list">
        <div className="aluno-list">
          {Array.isArray(alunosFiltrados) && alunosFiltrados.length > 0 ? (
            alunosFiltrados.map((aluno) => (
              <div
                className="aluno-card"
                key={aluno.id}
                onClick={() => setAlunoSelecionado(aluno)} // clique no card todo
                style={{ cursor: "pointer" }}
              >
                <p>
                  <strong>ID:</strong> {aluno.id}
                </p>
                <p>
                  <strong>Nome:</strong> {aluno.nome}
                </p>
                <p>
                  <strong>RA:</strong> {aluno.ra}
                </p>  
              </div>
              
            ))
          ) : (
            <p className="mensagem-vazia">Nenhum aluno encontrado.</p>
          )}
        </div>
      </div>
      {alunoSelecionado && (
        <ModalProntuario
          aluno={alunoSelecionado}
          onFechar={() => setAlunoSelecionado(null)}
          onAtualizarAluno={atualizarAluno}
        />
      )}
    </div>
  );
}
