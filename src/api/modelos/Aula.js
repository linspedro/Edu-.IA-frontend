import http from "../http";

const AulaApi = {
  gerarComIA: async (dados) => {
    try {
      const resposta = await http.post("/aulas/gerar", dados);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  listar: async () => {
    try {
      const resposta = await http.get("/aulas");
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  buscar: async (id) => {
    try {
      const resposta = await http.get(`/aulas/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  listarPorUsuario: async (id_usuario) => {
    try {
      const resposta = await http.get(`/aulas/usuario/${id_usuario}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  atualizar: async (id, dados) => {
    try {
      const resposta = await http.put(`/aulas/${id}`, dados);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  deletar: async (id) => {
    try {
      const resposta = await http.delete(`/aulas/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
};

export default AulaApi;