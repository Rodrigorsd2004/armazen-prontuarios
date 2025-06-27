import React, { useState } from "react";
import Header from "../components/Header";
import "./styles/AlunoForm.css";
import { IMaskInput } from "react-imask";

export default function AlunoForm({
  onVoltar,
  onNavigateAdicionar,
  onNavigateListar,
}) {
  const [formData, setFormData] = useState({
    nome: "",
    escola: "Profª Ernestina Nogueira César",
    codigoCIE: "240825",
    ra: "",
    cpf: "",
    rg: "",
    sexo: "",
    orgaoExpedidor: "",
    nis: "",
    corRaca: "",
    municipio: "",
    nacionalidade: "",
    ufNascimento: "",
    dataNascimento: "",
    nomePai: "",
    nomeMae: "",
    enderecoRua: "",
    enderecoBairro: "",
    enderecoCidade: "",
    enderecoUF: "",
    enderecoNumero: "",
    enderecoCEP: "",
    telefone1: "",
    telefone2: "",
  });

  const labels = {
    nome: "Nome",
    escola: "Escola",
    codigoCIE: "Código CIE",
    ra: "R.A.",
    cpf: "CPF",
    rg: "R.G.",
    sexo: "Sexo",
    orgaoExpedidor: "Órgão Expedidor",
    nis: "NIS",
    corRaca: "Cor/Raça",
    municipio: "Município",
    nacionalidade: "Nacionalidade",
    ufNascimento: "UF de Nascimento",
    dataNascimento: "Data de Nascimento",
    nomePai: "Nome do Pai",
    nomeMae: "Nome da Mãe",
    enderecoRua: "Rua",
    enderecoBairro: "Bairro",
    enderecoCidade: "Cidade",
    enderecoUF: "UF",
    enderecoNumero: "Número",
    enderecoCEP: "CEP",
    telefone1: "Telefone 1",
    telefone2: "Telefone 2",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.ra){
      alert("O campo R.A. é obrigatório.");
      return;
    } 

    if(!formData.nome){
      alert("O campo Nome é obrigatório.");
      return;
    }

    if(!formData.dataNascimento){
      alert("O campo Data de Nascimento é obrigatório.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/alunos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dataNascimento: formData.dataNascimento
            ? new Date(formData.dataNascimento)
            : null,
        }),
      });

      if (response.ok) {
        alert("Aluno cadastrado com sucesso!");
        setFormData({
          nome: "",
          escola: "Profª Ernestina Nogueira César",
          codigoCIE: "240825",
          ra: "",
          cpf: "",
          rg: "",
          sexo: "",
          orgaoExpedidor: "",
          nis: "",
          corRaca: "",
          municipio: "",
          nacionalidade: "",
          ufNascimento: "",
          dataNascimento: "",
          nomePai: "",
          nomeMae: "",
          enderecoRua: "",
          enderecoBairro: "",
          enderecoCidade: "",
          enderecoUF: "",
          enderecoNumero: "",
          enderecoCEP: "",
          telefone1: "",
          telefone2: "",
        });
      } else {
        alert("Erro ao cadastrar aluno");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro inesperado ao cadastrar aluno");
    }
  };

  return (
    <div className="aluno-form-container">
      <Header
        onNavigateHome={onVoltar}
        onNavigateAdicionar={onNavigateAdicionar}
        onNavigateListar={onNavigateListar}
      />
      <form className="aluno-form" onSubmit={handleSubmit}>
        <h2>Cadastro Completo do Aluno</h2>
        <div className="form-grid">
          {Object.entries(formData).map(([key, value]) => {
            let mask = null;

            if (key === "ra") mask = "000000000-*";
            if (key === "cpf") mask = "000000000-00";
            if (key === "rg") mask = "00000000-**";
            if (key === "enderecoCEP") mask = "00000-000";
            if (key === "telefone1" || key === "telefone2")
              mask = "(00) 00000-0000";

            return (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{labels[key] || key}</label>

                {mask ? (
                  <IMaskInput
                    mask={mask}
                    name={key}
                    id={key}
                    value={value}
                    onAccept={(val) =>
                      setFormData((prev) => ({ ...prev, [key]: val }))
                    }
                  />
                ) : (
                  <input
                    type={key.includes("data") ? "date" : "text"}
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn-submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
