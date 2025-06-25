import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import modeloExcel from "../assets/modelo-prontuario.xlsx";
import { read, utils, write } from "xlsx";

export async function gerarExcelComDados(aluno) {
  const response = await fetch(modeloExcel);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Preenche os campos conforme o mapeamento
  sheet["B11"].v = aluno.escola || "";
  sheet["J11"].v = aluno.codigoCIE || "";
  sheet["B13"].v = aluno.ra || "";
  sheet["F13"].v = aluno.cpf || "";
  sheet["J13"].v = aluno.rg || "";
  sheet["B15"].v = aluno.rm || "";
  sheet["F15"].v = aluno.sexo || "";
  sheet["J15"].v = aluno.orgaoExpedidor || "";
  sheet["C17"].v = aluno.nome || "";
  sheet["B20"].v = aluno.nis || "";
  sheet["I20"].v = aluno.corRaca || "";
  sheet["C28"].v = aluno.municipio || "";
  sheet["C29"].v = aluno.nacionalidade || "";
  sheet["H29"].v = aluno.ufNascimento || "";

  if (aluno.dataNascimento) {
    const [ano, mes, dia] = aluno.dataNascimento.split("-");
    sheet["J29"].v = dia;
    sheet["K29"].v = mes;
    sheet["L29"].v = ano;
  }

  sheet["C31"].v = aluno.nomePai || "";
  sheet["C34"].v = aluno.nomeMae || "";
  sheet["O18"].v = aluno.enderecoRua || "";
  sheet["U18"].v = aluno.enderecoNumero || "";
  sheet["O20"].v = aluno.enderecoBairro || "";
  sheet["O21"].v = aluno.enderecoCidade || "";
  sheet["V20"].v = aluno.enderecoUF || "";
  sheet["V21"].v = aluno.enderecoCEP || "";
  sheet["Q25"].v = aluno.telefone1 || "";
  sheet["Q26"].v = aluno.telefone2 || "";

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, `prontuario_${aluno.nome}.xlsx`);
}
