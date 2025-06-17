import React from "react";
import { Ocorrencia } from "../models/interfaces";

interface Props {
  ocorrencias: Ocorrencia[];
  onRemove?: (index: number) => void;
}

export const OcorrenciaList: React.FC<Props> = ({ ocorrencias, onRemove }) => {
  if (ocorrencias.length === 0) {
    return <p>Nenhuma ocorrência registrada.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: 900, margin: "0 auto" }}>
      <thead>
        <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
          <th style={thStyle}>Aluno</th>
          <th style={thStyle}>Turma</th>
          <th style={thStyle}>Professor</th>
          <th style={thStyle}>Disciplina</th>
          <th style={thStyle}>Aula</th>
          <th style={thStyle}>Motivo</th>
          {onRemove && <th style={thStyle}>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {ocorrencias.map((ocorrencia, index) => (
          <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
            <td style={tdStyle}>{ocorrencia.aluno.nome} ({ocorrencia.aluno.idade} anos)</td>
            <td style={tdStyle}>{ocorrencia.aluno.turma}</td>
            <td style={tdStyle}>{ocorrencia.professor.nome} ({ocorrencia.professor.idade} anos)</td>
            <td style={tdStyle}>{ocorrencia.professor.disciplina}</td>
            <td style={tdStyle}>{ocorrencia.aula}</td>
            <td style={tdStyle}>{ocorrencia.motivo}</td>
            {onRemove && (
              <td style={tdStyle}>
                <button onClick={() => onRemove(index)}>Remover</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const thStyle: React.CSSProperties = {
  padding: "20px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: "20px",
  border: "3px solid #ddd",
};

const rowEven: React.CSSProperties = {
  backgroundColor: "#f1f8e9",
};

const rowOdd: React.CSSProperties = {
  backgroundColor: "#ffffff",
};
