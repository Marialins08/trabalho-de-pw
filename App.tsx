 import React, { useEffect, useState } from "react";
import { OcorrenciaForm } from "./components/OcorrenciaForm";
import { OcorrenciaList } from "./components/OcorrenciaList";
import { dadosUnificados } from "./data/dadosUnificados";
import { Ocorrencia } from "./models/interfaces";
import { Login } from "./Site/Login";

const STORAGE_KEY = "ocorrencias";

const App: React.FC = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [logado, setLogado] = useState<boolean>(false);
  const [mostrandoBoasVindas, setMostrandoBoasVindas] = useState<boolean>(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");

  useEffect(() => {
    document.body.style.backgroundColor = "#e3f7ff";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    const usuarioLogado = localStorage.getItem("usuarioLogado") === "true";
    const nome = localStorage.getItem("nomeUsuario") || "";
    setLogado(usuarioLogado);
    setNomeUsuario(nome);

    const ocorrenciasSalvas = localStorage.getItem(STORAGE_KEY);
    setOcorrencias(
      ocorrenciasSalvas ? JSON.parse(ocorrenciasSalvas) : [dadosUnificados.ocorrencia]
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  }, [ocorrencias]);

  const adicionarOcorrencia = (nova: Ocorrencia): void => {
    setOcorrencias((prev) => [...prev, nova]);
  };

  const removerOcorrencia = (index: number): void => {
    setOcorrencias((prev) => prev.filter((_, i) => i !== index));
  };

  const realizarLogin = (nome: string): void => {
    setNomeUsuario(nome);
    setMostrandoBoasVindas(true);
    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("nomeUsuario", nome);

    setTimeout(() => {
      setMostrandoBoasVindas(false);
      setLogado(true);
    }, 2000);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "3rem auto",
    padding: "2rem",
    backgroundColor: "#4682B4",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    textAlign: "center",
    transition: "all 0.3s ease",
  };

  const headingStyle: React.CSSProperties = {
    color: "#1c7ed6",
    marginBottom: "1rem",
  };

  const userInfoStyle: React.CSSProperties = {
    fontStyle: "italic",
    color: "#3b5bdb",
    marginBottom: "2rem",
  };

  const dividerStyle: React.CSSProperties = {
    border: "none",
    height: "2px",
    backgroundColor: "#a5d8ff",
    margin: "3rem 0",
    borderRadius: "4px",
  };

  const welcomeStyle: React.CSSProperties = {
    marginTop: "120px",
    textAlign: "center",
    color: "#1864ab",
    fontSize: "1.5rem",
  };

  if (!logado) {
    return mostrandoBoasVindas ? (
      <div style={welcomeStyle}>
        <h2>Bem-vindo, {nomeUsuario}!</h2>
        <p>Redirecionando para o sistema...</p>
      </div>
    ) : (
      <Login onLogin={realizarLogin} />
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>📋 Registro de Ocorrências</h1>
      <p style={userInfoStyle}>Usuário logado: {nomeUsuario}</p>

      <OcorrenciaForm onAdd={adicionarOcorrencia} />

      <hr style={dividerStyle} />

      <OcorrenciaList ocorrencias={ocorrencias} onRemove={removerOcorrencia} />
    </div>
  );
};

export default App;
