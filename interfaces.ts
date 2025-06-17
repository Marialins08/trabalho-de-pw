// Pessoa base
export interface Pessoa {
  nome: string;
  idade: number;
}

// Aluno herda Pessoa e adiciona turma
export interface Aluno extends Pessoa {
  turma: string;
}

// Professor herda Pessoa e adiciona disciplina
export interface Professor extends Pessoa {
  disciplina: string;
}

// Ocorrência que liga aluno, professor, motivo e aula
export interface Ocorrencia {
  aluno: Aluno;
  professor: Professor;
  motivo: string;
  aula: string;
  data?: Date; // Adicionando um campo opcional para registrar a data da ocorrência
}