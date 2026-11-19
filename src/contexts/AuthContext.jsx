
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Padroniza o usuário recebido pelo login
function normalizarUsuario(dados) {
  if (!dados) return null;

  const candidatos = [
    dados.usuario,
    dados.data?.usuario,
    dados.data,
    dados,
  ];

  const usuarioEncontrado = candidatos.find(
    (item) =>
      item &&
      typeof item === "object" &&
      (item.id_usuario != null || item.id != null)
  );

  if (!usuarioEncontrado) {
    console.error("Dados de usuário sem identificador:", dados);
    return null;
  }

  return {
    ...usuarioEncontrado,
    id_usuario:
      usuarioEncontrado.id_usuario ?? usuarioEncontrado.id,
  };
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioSalvo = localStorage.getItem("usuario");

      if (!usuarioSalvo) return null;

      return normalizarUsuario(JSON.parse(usuarioSalvo));
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      localStorage.removeItem("usuario");
      return null;
    }
  });

  const idUsuario = usuario?.id_usuario ?? null;

  function login(dados) {
    const usuarioNormalizado = normalizarUsuario(dados);

    if (!usuarioNormalizado) {
      console.error("Não foi possível identificar o usuário no login.");
      return false;
    }

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioNormalizado)
    );

    setUsuario(usuarioNormalizado);

    return true;
  }

  function logout() {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        idUsuario,
        login,
        logout,
        autenticado: !!idUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
