import React, { useState } from "react";

interface Props {
  onLogin: (nome: string) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Login sem verificação fixa
    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("nomeUsuario", usuario);
    onLogin(usuario);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 300, margin: "100px auto", textAlign: "center" }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};
