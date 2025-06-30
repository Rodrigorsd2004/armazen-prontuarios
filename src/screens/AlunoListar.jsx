import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalProntuario from "../components/ModalProntuario";
import BarraPesquisa from "../components/BarraPesquisa";
import BackgroundParallax from "../components/BackgroundParallax"; // import novo
import "./styles/AlunoListar.css";

export default function AlunoListar({
  onVoltar,
  onNavigateAdicionar,
  onNavigateListar,
}) {
  const [alunos, setAlunos] = useState([]); 
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/alunos`)
      .then((res) => res.json())
      .then((data) => setAlunos(data ?? []))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  const alunosFiltrados = (alunos || []).filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      aluno.ra?.toString().includes(filtro)
  );

  const atualizarAluno = (alunoAtualizado) => {
    if (!alunoAtualizado) {
      setAlunos((prev) => prev.filter((a) => a.id !== alunoSelecionado?.id));
    } else {
      setAlunos((prev) =>
        prev.map((a) => (a.id === alunoAtualizado.id ? alunoAtualizado : a))
      );
    }
    setAlunoSelecionado(null);
  };

  return (
    <>
      <BackgroundParallax imageUrl="https://images.unsplash.com/photo-1750099255888-91d5386e833c?q=80&w=870&auto=format&fit=crop" />
      <div className="aluno-listar-container" style={{ position: "relative", zIndex: 1 }}>
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
                  onClick={() => setAlunoSelecionado(aluno)}
                  style={{ cursor: "pointer" }}
                >
                  <p><strong>ID:</strong> {aluno.id}</p>
                  <p><strong>Nome:</strong> {aluno.nome}</p>
                  <p><strong>RA:</strong> {aluno.ra}</p>
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
    </>
  );
}
