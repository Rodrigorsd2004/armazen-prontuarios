import { saveAs } from "file-saver";

export async function gerarExcelComDados(aluno) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/gerar-excel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    });

    if (!response.ok) {
      throw new Error("Erro ao gerar o arquivo Excel");
    }

    const blob = await response.blob();
    saveAs(blob, `prontuario_${aluno.nome}.xlsx`);
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
    alert("Erro ao exportar o Excel.");
  }
}
