import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Styles/ModalProntuario.css";
import { verificarSenha } from "../utils/verificaSenha";
import ConfirmModal from "./ConfirmModal";
import { gerarExcelComDados } from "../utils/exportarExcel";


const modeloExcel = "/modelo-prontuario.xlsx";

export default function ModalProntuario({ aluno, onFechar, onAtualizarAluno }) {
  if (!aluno) return null;

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...aluno, id: aluno.id }); // <-- Garante que o ID esteja presente
  const [modalConfirmarAberto, setModalConfirmarAberto] = useState(false);

  const handleChange = (campo, valor) => {
    setFormData({ ...formData, [campo]: valor });
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const gerarExcelComDados = () => {
  const dados = [
    {
      Escola: formData.escola,
      CIE: formData.codigoCIE,
      RA: formData.ra,
      CPF: formData.cpf,
      RG: formData.rg,
      RM: formData.rm,
      Sexo: formData.sexo,
      Exp: formData.orgaoExpedidor,
      Nome: formData.nome,
      NIS: formData.nis,
      BolsaFamilia: formData.bolsaFamilia,
      CorRaca: formData.corRaca,
      NecessidadesEspeciais: formData.necessidadesEspeciais,
      Municipio: formData.municipio,
      Nacionalidade: formData.nacionalidade,
      UF: formData.ufNascimento,
      DataNascimento: formatarData(formData.dataNascimento),
      NomePai: formData.nomePai,
      NomeMae: formData.nomeMae,
      Endereco: `${formData.enderecoRua}, ${formData.enderecoNumero} - ${formData.enderecoBairro}, ${formData.enderecoCidade}/${formData.enderecoUF} - CEP ${formData.enderecoCEP}`,
      Telefone1: formData.telefone1,
      Telefone2: formData.telefone2,
    },
  ];

  const ws = XLSX.utils.json_to_sheet(dados);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Prontuario");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `prontuario_${formData.nome}.xlsx`);
};


  const salvarEdicao = async () => {
    try {
      const response = await fetch(
  `https://armazen-prontuario-api-production.up.railway.app/alunos/${formData.id}`,
  {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }
);

      if (response.ok) {
        alert("Alterações salvas com sucesso.");
        const dadosAtualizados = await response.json();
        setFormData(dadosAtualizados);
        setEditando(false);
        if (onAtualizarAluno) onAtualizarAluno(dadosAtualizados);
      } else {
        alert("Erro ao salvar alterações.");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar as alterações.");
    }
  };

  const excluirAluno = async () => {
    const senha = prompt("Digite a senha para confirmar a exclusão:");

    if (!verificarSenha(senha)) {
      alert("Senha incorreta. Exclusão cancelada.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este aluno?"
    );
    if (!confirmar) return;

    try {
      const response = await fetch(
  `https://armazen-prontuario-api-production.up.railway.app/alunos/${aluno.id}`,
  {
    method: "DELETE",
  }
);
      if (response.ok) {
        alert("Aluno excluído com sucesso.");
        onFechar(); 
        if (onAtualizarAluno) onAtualizarAluno(null); 
      } else {
        alert("Erro ao excluir aluno.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro inesperado ao excluir o aluno.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-excel-layout" onClick={(e) => e.stopPropagation()}>
        <button className="fechar-modal" onClick={onFechar}>
          ×
        </button>

        <div className="excel-header">
          <h3>GOVERNO DO ESTADO DE SÃO PAULO</h3>
          <p>SECRETARIA DE ESTADO DA EDUCAÇÃO</p>
          <p>PREFEITURA MUNICIPAL DE PARDINHO/SP</p>
          <p>DIRETORIA DE ENSINO REGIÃO DE BOTUCATU/SP</p>
        </div>

        <div className="excel-bloco">
          <div>
            <strong>ESCOLA:</strong>{" "}
            {editando ? (
              <input
                value={formData.escola}
                onChange={(e) => handleChange("escola", e.target.value)}
              />
            ) : (
              formData.escola
            )}
          </div>
          <div>
            <strong>CÓDIGO CIE:</strong>{" "}
            {editando ? (
              <input
                value={formData.codigoCIE}
                onChange={(e) => handleChange("codigoCIE", e.target.value)}
              />
            ) : (
              formData.codigoCIE
            )}
          </div>
        </div>

        <div className="excel-bloco">
          <div>
            <strong>RA:</strong>{" "}
            {editando ? (
              <input
                value={formData.ra}
                onChange={(e) => handleChange("ra", e.target.value)}
              />
            ) : (
              formData.ra
            )}
          </div>
          <div>
            <strong>CPF:</strong>{" "}
            {editando ? (
              <input
                value={formData.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
              />
            ) : (
              formData.cpf
            )}
          </div>
          <div>
            <strong>RG:</strong>{" "}
            {editando ? (
              <input
                value={formData.rg}
                onChange={(e) => handleChange("rg", e.target.value)}
              />
            ) : (
              formData.rg
            )}
          </div>
        </div>

        <div className="excel-bloco">
          <div>
            <strong>SEXO:</strong>{" "}
            {editando ? (
              <input
                value={formData.sexo}
                onChange={(e) => handleChange("sexo", e.target.value)}
              />
            ) : (
              formData.sexo
            )}
          </div>
          <div>
            <strong>EXP:</strong>{" "}
            {editando ? (
              <input
                value={formData.orgaoExpedidor}
                onChange={(e) => handleChange("orgaoExpedidor", e.target.value)}
              />
            ) : (
              formData.orgaoExpedidor
            )}
          </div>
        </div>

        <div className="excel-linha">
          <strong>NOME DO ALUNO:</strong>{" "}
          {editando ? (
            <input
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
          ) : (
            formData.nome
          )}
        </div>

        <div className="excel-bloco">
          <div>
            <strong>NIS:</strong>{" "}
            {editando ? (
              <input
                value={formData.nis}
                onChange={(e) => handleChange("nis", e.target.value)}
              />
            ) : (
              formData.nis
            )}
          </div>
          <div>
            <strong>COR/RAÇA:</strong>{" "}
            {editando ? (
              <input
                value={formData.corRaca}
                onChange={(e) => handleChange("corRaca", e.target.value)}
              />
            ) : (
              formData.corRaca
            )}
          </div>
        </div>

        <div className="excel-bloco">
          <div>
            <strong>DATA NASC.:</strong>{" "}
            {editando ? (
              <input
                type="date"
                value={formData.dataNascimento?.split("T")[0]}
                onChange={(e) => handleChange("dataNascimento", e.target.value)}
              />
            ) : (
              formatarData(formData.dataNascimento)
            )}
          </div>
          
        </div>

        <div className="excel-bloco">
          <div>
            <strong>MUNICÍPIO:</strong>{" "}
            {editando ? (
              <input
                value={formData.municipio}
                onChange={(e) => handleChange("municipio", e.target.value)}
              />
            ) : (
              formData.municipio
            )}
          </div>
          <div>
            <strong>NACIONALIDADE:</strong>{" "}
            {editando ? (
              <input
                value={formData.nacionalidade}
                onChange={(e) => handleChange("nacionalidade", e.target.value)}
              />
            ) : (
              formData.nacionalidade
            )}
          </div>
          <div>
            <strong>UF:</strong>{" "}
            {editando ? (
              <input
                value={formData.ufNascimento}
                onChange={(e) => handleChange("ufNascimento", e.target.value)}
              />
            ) : (
              formData.ufNascimento
            )}
          </div>
        </div>

        <div className="excel-bloco">
          <div>
            <strong>NOME DO PAI:</strong>{" "}
            {editando ? (
              <input
                value={formData.nomePai}
                onChange={(e) => handleChange("nomePai", e.target.value)}
              />
            ) : (
              formData.nomePai
            )}
          </div>
          <div>
            <strong>NOME DA MÃE:</strong>{" "}
            {editando ? (
              <input
                value={formData.nomeMae}
                onChange={(e) => handleChange("nomeMae", e.target.value)}
              />
            ) : (
              formData.nomeMae
            )}
          </div>
        </div>

        <div className="excel-linha">
          <strong>ENDEREÇO:</strong>{" "}
          {editando ? (
            <>
              <input
                value={formData.enderecoRua}
                onChange={(e) => handleChange("enderecoRua", e.target.value)}
              />{" "}
              ,{" "}
              <input
                value={formData.enderecoNumero}
                onChange={(e) => handleChange("enderecoNumero", e.target.value)}
              />{" "}
              -{" "}
              <input
                value={formData.enderecoBairro}
                onChange={(e) => handleChange("enderecoBairro", e.target.value)}
              />
              ,{" "}
              <input
                value={formData.enderecoCidade}
                onChange={(e) => handleChange("enderecoCidade", e.target.value)}
              />{" "}
              /{" "}
              <input
                value={formData.enderecoUF}
                onChange={(e) => handleChange("enderecoUF", e.target.value)}
              />{" "}
              - CEP{" "}
              <input
                value={formData.enderecoCEP}
                onChange={(e) => handleChange("enderecoCEP", e.target.value)}
              />
            </>
          ) : (
            `${formData.enderecoRua}, ${formData.enderecoNumero} - ${formData.enderecoBairro}, ${formData.enderecoCidade}/${formData.enderecoUF} - CEP ${formData.enderecoCEP}`
          )}
        </div>

        <div className="excel-bloco">
          <div>
            <strong>TELEFONES:</strong>{" "}
            {editando ? (
              <>
                <input
                  value={formData.telefone1}
                  onChange={(e) => handleChange("telefone1", e.target.value)}
                />{" "}
                /{" "}
                <input
                  value={formData.telefone2}
                  onChange={(e) => handleChange("telefone2", e.target.value)}
                />
              </>
            ) : (
              ` ${formData.telefone1} / ${formData.telefone2}`
            )}
          </div>
        </div>

        <div className="excel-botoes">
          <button onClick={() => gerarExcelComDados(formData)} title="Baixar">📥</button>

          <button onClick={() => window.print()} title="Imprimir">
            🖨️
          </button>
          {editando ? (
            <button onClick={salvarEdicao} title="Salvar">
              💾
            </button>
          ) : (
            <button onClick={() => setEditando(true)} title="Editar">
              ✏️
            </button>
          )}
          <button title="Excluir" onClick={() => setModalConfirmarAberto(true)}>
            🗑️
          </button>

          <ConfirmModal
            isOpen={modalConfirmarAberto}
            onClose={() => setModalConfirmarAberto(false)}
            onConfirm={async () => {
              setModalConfirmarAberto(false);
              try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/alunos/${aluno.id}`, {
                    method: "DELETE",
                  }
                );
                if (response.ok) {
                  alert("Aluno excluído com sucesso.");
                  onFechar();
                  if (onAtualizarAluno) onAtualizarAluno(null);
                } else {
                  alert("Erro ao excluir aluno.");
                }
              } catch (error) {
                console.error(error);
                alert("Erro ao excluir aluno.");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
