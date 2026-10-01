import http from "../http";

const AulaApi = {
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


};

export default AulaApi;