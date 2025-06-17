import React, { useState } from "react";
import { Aluno, Professor, Ocorrencia } from "../models/interfaces";

interface Props {
  onAdd: (ocorrencia: Ocorrencia) => void;
}

export const OcorrenciaForm: React.FC<Props> = ({ onAdd }) => {
  const [aluno, setAluno] = useState<Aluno>({ nome: "", idade: 0, turma: "" });
  const [professor, setProfessor] = useState<Professor>({ nome: "", idade: 0, disciplina: "" });
  const [motivo, setMotivo] = useState("");
  const [aula, setAula] = useState("");

  const handleAlunoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: name === "idade" ? +value : value });
  };

  const handleProfessorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: name === "idade" ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaOcorrencia: Ocorrencia = { aluno, professor, motivo, aula };
    onAdd(novaOcorrencia);

    // Limpar campos
    setAluno({ nome: "", idade: 0, turma: "" });
    setProfessor({ nome: "", idade: 0, disciplina: "" });
    setMotivo("");
    setAula("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Registrar Ocorrência</h2>

      <input name="nome" value={aluno.nome} onChange={handleAlunoChange} placeholder="Nome do Aluno" required />
      <input name="idade" type="number" value={aluno.idade || ""} onChange={handleAlunoChange} placeholder="Idade do Aluno" required />
      <input name="turma" value={aluno.turma} onChange={handleAlunoChange} placeholder="Turma" required />

      <input name="nome" value={professor.nome} onChange={handleProfessorChange} placeholder="Nome do Professor" required />
      <input name="idade" type="number" value={professor.idade || ""} onChange={handleProfessorChange} placeholder="Idade do Professor" required />
      <input name="disciplina" value={professor.disciplina} onChange={handleProfessorChange} placeholder="Disciplina" required />

      <input name="aula" value={aula} onChange={(e) => setAula(e.target.value)} placeholder="Aula" required />
      <input name="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Motivo" required />

      <button type="submit">Registrar</button>
    </form>
  );
};
