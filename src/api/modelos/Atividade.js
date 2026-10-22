
import http from "../http";

const tratarErro = (error) => ({
  data: error.response?.data ?? {
    erro: "Não foi possível conectar ao servidor.",
  },
  status: error.response?.status ?? 0,
});

const AtividadeApi = {
  gerarComIA: async (dados) => {
    try {
      const resposta = await http.post("/atividades/gerar", dados);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },

  criar: async (dados) => {
    try {
      const resposta = await http.post("/atividades", dados);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },

  listar: async () => {
    try {
      const resposta = await http.get("/atividades");
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },

  listarPorUsuario: async (id_usuario) => {
    try {
      const resposta = await http.get(
        `/atividades/usuario/${id_usuario}`
      );
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },

  buscar: async (id) => {
    try {
      const resposta = await http.get(`/atividades/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },

  deletar: async (id) => {
    try {
      const resposta = await http.delete(`/atividades/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return tratarErro(error);
    }
  },
};

export default AtividadeApi;
