import http from "../http";

const AtividadeApi = {
  listar: async () => {
    try {
      const resposta = await http.get("/atividades");
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  buscar: async (id) => {
    try {
      const resposta = await http.get(`/atividades/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },

};

export default AtividadeApi;