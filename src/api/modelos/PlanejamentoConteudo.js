import http from "../http";

const PlanejamentoConteudoApi = {
  criar: async (conteudo) => {
    try {
      const resposta = await http.post("/planejamento-conteudo", conteudo);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { 
        data: error.response?.data, 
        status: error.response?.status || 500 
      };
    }
  },

  listarPorPlanejamento: async (id_planejamento) => {
    try {
      // Certifique-se de que a rota bate com a configurada no seu Backend
      const resposta = await http.get(`/planejamento-conteudo/${id_planejamento}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { 
        data: error.response?.data, 
        status: error.response?.status || 500 
      };
    }
  },
};

export default PlanejamentoConteudoApi;